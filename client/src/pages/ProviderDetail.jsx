import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { providers as providersApi } from '../lib/api';
import Button from '../components/ui/Button/Button';
import Card from '../components/ui/Card/Card';
import Badge from '../components/ui/Badge/Badge';
import Skeleton from '../components/ui/Skeleton/Skeleton';
import BookingModal from '../components/customer/BookingModal';
import ChatBox from '../components/customer/ChatBox';
import styles from './ProviderDetail.module.css';

export default function ProviderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    providersApi.getById(id)
      .then((res) => {
        setProvider(res.data.provider);
        setLoading(false);
      })
      .catch(() => {
        setError('Provider not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container page">
        <Skeleton variant="rect" height={200} />
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="container page">
        <div className={styles.error}>
          <h2>{error || 'Provider not found'}</h2>
          <Link to="/services"><Button>Browse Providers</Button></Link>
        </div>
      </div>
    );
  }

  const handleBook = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <div className="container page">
      <div className={styles.header}>
        <div className={styles.profileRow}>
          <div className={styles.avatar}>
            {provider.name?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.businessName}>{provider.business_name}</h1>
            <p className={styles.providerName}>{provider.name}</p>
            <div className={styles.ratingRow}>
              <Badge variant="warning">★ {parseFloat(provider.rating).toFixed(1)}</Badge>
              <span className={styles.reviewCount}>{provider.total_reviews} reviews</span>
              {provider.is_verified && <Badge variant="success">Verified</Badge>}
            </div>
          </div>
        </div>

        {user && user.id !== provider.user_id && (
          <div className={styles.actions}>
            <Button variant="accent" size="lg" fullWidth onClick={() => setShowChat(true)}>
              Send Message
            </Button>
          </div>
        )}
      </div>

      {provider.description && (
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.description}>{provider.description}</p>
        </Card>
      )}

      <div className={styles.contactSection}>
        <Card className={styles.contactCard}>
          <h3>Phone</h3>
          <a href={`tel:${provider.phone}`} className={styles.contactLink}>
            {provider.phone || 'Not provided'}
          </a>
        </Card>
        <Card className={styles.contactCard}>
          <h3>Email</h3>
          <a href={`mailto:${provider.email}`} className={styles.contactLink}>
            {provider.email}
          </a>
        </Card>
        <Card className={styles.contactCard}>
          <h3>Service Area</h3>
          <p className={styles.contactValue}>{provider.service_area || 'All areas'}</p>
        </Card>
      </div>

      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Services & Pricing</h2>
        <div className={styles.servicesList}>
          {provider.services?.map((svc) => (
            <div key={svc.id} className={styles.serviceCard}>
              <div className={styles.serviceInfo}>
                <h3 className={styles.serviceName}>{svc.name}</h3>
                <p className={styles.serviceDesc}>{svc.description}</p>
                <span className={styles.duration}>{svc.duration} min</span>
              </div>
              <div className={styles.serviceAction}>
                <span className={styles.price}>Rs. {svc.price}</span>
                {user && user.role === 'customer' && (
                  <Button size="sm" onClick={() => handleBook(svc)}>Book Now</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {showBooking && (
        <BookingModal
          provider={provider}
          service={selectedService}
          onClose={() => { setShowBooking(false); setSelectedService(null); }}
        />
      )}

      {showChat && (
        <ChatBox
          provider={provider}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
