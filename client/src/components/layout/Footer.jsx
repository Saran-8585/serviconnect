import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div>
            <div className={styles.brand}>
              Servi<span className={styles.brandAccent}>connect</span>
            </div>
            <p className={styles.description}>
              Connect with trusted local service providers for all your needs.
              From home cleaning to electrical work, find the right professional
              for every job.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Services</h4>
            <Link to="/services">Browse All</Link>
            <Link to="/services?category=cleaning">Home Cleaning</Link>
            <Link to="/services?category=electrical">Electrical</Link>
            <Link to="/services?category=plumbing">Plumbing</Link>
          </div>

          <div className={styles.column}>
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>

          <div className={styles.column}>
            <h4>For Providers</h4>
            <Link to="/provider/register">Join as Provider</Link>
            <Link to="/provider/guidelines">Guidelines</Link>
            <Link to="/provider/help">Help Center</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} Serviconnect. All rights reserved.</span>
          <span>Built with care for local communities.</span>
        </div>
      </div>
    </footer>
  );
}
