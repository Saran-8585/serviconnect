import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          Servi<span className={styles.logoAccent}>connect</span>
        </Link>

        <div className={styles.nav}>
          <Link to="/services" className={styles.link}>
            Browse Services
          </Link>

          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <Link to={user.role === 'provider' ? '/provider' : '/dashboard'} className={styles.link}>
                Dashboard
              </Link>
              <Link to="/" className={styles.link} onClick={() => alert('Messages coming soon.')}>
                Messages
              </Link>
              <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className={styles.userName}>{user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}

          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <button
          className={styles.mobileMenuBtn}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
