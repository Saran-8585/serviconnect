import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { categories as categoriesApi, providers as providersApi } from '../lib/api';
import Card from '../components/ui/Card/Card';
import Skeleton from '../components/ui/Skeleton/Skeleton';
import Badge from '../components/ui/Badge/Badge';
import styles from './Services.module.css';

export default function Services() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const [categoryList, setCategoryList] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    categoriesApi.getAll()
      .then((res) => setCategoryList(res.data.categories))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = {};
    if (activeCategory) {
      params.category_slug = activeCategory;
    }

    providersApi.getAll(params)
      .then((res) => {
        setProviderList(res.data.providers);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load providers.');
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="container page">
      <div className={styles.header}>
        <h1 className={styles.title}>
          {activeCategory
            ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace(/-/g, ' ')} Services`
            : 'All Services'}
        </h1>
        <p className={styles.subtitle}>Find trusted professionals for your needs</p>
      </div>

      <div className={styles.categoryTabs}>
        <Link
          to="/services"
          className={`${styles.tab} ${!activeCategory ? styles.tabActive : ''}`}
        >
          All
        </Link>
        {categoryList.map((cat) => (
          <Link
            key={cat.id}
            to={`/services?category=${cat.slug}`}
            className={`${styles.tab} ${activeCategory === cat.slug ? styles.tabActive : ''}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {loading && (
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <Card key={i} className={styles.card}>
              <Skeleton variant="title" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rect" height={40} />
            </Card>
          ))}
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && providerList.length === 0 && (
        <div className={styles.empty}>
          <p>No providers found for this category.</p>
          <Link to="/services" className={styles.backLink}>Browse all services</Link>
        </div>
      )}

      {!loading && !error && providerList.length > 0 && (
        <div className={styles.grid}>
          {providerList.map((provider) => (
            <Link to={`/providers/${provider.id}`} key={provider.id} className={styles.cardLink}>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {provider.name?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.businessName}>{provider.business_name}</h3>
                  <p className={styles.providerName}>{provider.name}</p>
                </div>
              </div>

              <div className={styles.ratingRow}>
                <Badge variant="warning">
                  ★ {parseFloat(provider.rating).toFixed(1)}
                </Badge>
                <span className={styles.reviewCount}>
                  {provider.total_reviews} reviews
                </span>
                {provider.is_verified && (
                  <Badge variant="success">Verified</Badge>
                )}
              </div>

              {provider.services?.length > 0 && (
                <div className={styles.servicesList}>
                  {provider.services.slice(0, 2).map((svc) => (
                    <div key={svc.id} className={styles.serviceItem}>
                      <span className={styles.serviceName}>{svc.name}</span>
                      <span className={styles.servicePrice}>Rs. {svc.price}</span>
                    </div>
                  ))}
                  {provider.services.length > 2 && (
                    <p className={styles.moreServices}>
                      +{provider.services.length - 2} more services
                    </p>
                  )}
                </div>
              )}

              {provider.service_area && (
                <p className={styles.area}>{provider.service_area}</p>
              )}
            </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
