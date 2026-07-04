import { useAuth } from '../context/AuthContext';
import RecommendedProviders from '../components/customer/RecommendedProviders';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container page">
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome, {user.name}</h1>
        <p className={styles.subtitle}>
          {user.role === 'provider'
            ? 'Manage your services and bookings.'
            : 'View and manage your bookings.'}
        </p>
      </div>
      {user.role === 'customer' && <RecommendedProviders />}
    </div>
  );
}
