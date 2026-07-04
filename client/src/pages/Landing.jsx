import { Link } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import Input from '../components/ui/Input/Input';
import styles from './Landing.module.css';

const categories = [
  { name: 'Plumbing', slug: 'plumbing', icon: '🔧' },
  { name: 'Electrical', slug: 'electrical', icon: '⚡' },
  { name: 'Cleaning', slug: 'cleaning', icon: '🧹' },
  { name: 'Painting', slug: 'painting', icon: '🎨' },
  { name: 'Carpentry', slug: 'carpentry', icon: '🪚' },
  { name: 'Appliance Repair', slug: 'appliance-repair', icon: '🔧' },
  { name: 'Cab Driver', slug: 'cab-driver', icon: '🚕' },
  { name: 'Refresher Courses', slug: 'refresher-courses', icon: '🔄' },
  { name: 'Tuition', slug: 'tuition', icon: '📖' },
  { name: 'Beauty Parlour', slug: 'beauty-parlour', icon: '💅' },
];

export default function Landing() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Find trusted local<br />
              <span className={styles.heroAccent}>service professionals</span>
            </h1>
            <p className={styles.heroSubtitle}>
              From plumbing to painting, connect with verified providers in your area.
              Book reliable service in seconds.
            </p>
            <div className={styles.heroActions}>
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <a href="#categories">
                <Button variant="secondary" size="lg">Browse Services</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.searchSection}>
        <div className="container">
          <div className={styles.searchBox}>
            <Input
              placeholder="What service do you need?"
              name="search"
            />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      <section id="categories" className={styles.categoriesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <p className={styles.sectionSubtitle}>
            Find the right professional for every job
          </p>
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <Link to={`/services?category=${cat.slug}`} key={cat.name}>
                <div className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>{cat.icon}</div>
                  <span className={styles.categoryName}>{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            Get your service done in three simple steps
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Find a Provider</h3>
              <p className={styles.stepDesc}>
                Browse categories or search for the service you need.
                Compare providers and read reviews.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Book a Time</h3>
              <p className={styles.stepDesc}>
                Pick a convenient date and time slot.
                Confirm your booking in one click.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Get It Done</h3>
              <p className={styles.stepDesc}>
                The provider arrives and completes the service.
                Pay after satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Are you a service provider?</h2>
          <p className={styles.ctaDesc}>
            Join Serviconnect and grow your business. Reach more customers,
            manage bookings, and build your reputation.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/register">
              <Button variant="accent" size="lg">Join as Provider</Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
