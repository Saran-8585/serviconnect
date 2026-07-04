import { useState, useEffect } from 'react';
import { recommendations } from '../../lib/api';
import Card from '../ui/Card/Card';
import Skeleton from '../ui/Skeleton/Skeleton';
import styles from './RecommendedProviders.module.css';

export default function RecommendedProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    recommendations.get()
      .then((res) => {
        if (mounted) {
          setProviders(res.data.recommendations);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Could not load recommendations.');
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recommended for You</h2>
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton variant="title" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || providers.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recommended for You</h2>
      <div className={styles.grid}>
        {providers.map((p) => (
          <Card key={p.providerId} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                {p.providerName.charAt(0).toUpperCase()}
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.businessName}>{p.businessName}</h3>
                <p className={styles.providerName}>{p.providerName}</p>
              </div>
            </div>
            {p.service && (
              <div className={styles.serviceInfo}>
                <span className={styles.category}>{p.service.category}</span>
                <span className={styles.price}>Rs. {p.service.price}</span>
              </div>
            )}
            <div className={styles.cardFooter}>
              <span className={styles.rating}>
                ★ {p.rating.toFixed(1)} ({p.totalReviews})
              </span>
              {p.serviceArea && (
                <span className={styles.area}>{p.serviceArea}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
