import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast/Toast';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import styles from './Login.module.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name || form.name.length < 2) newErrors.name = 'Name must be at least 2 characters.';
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await register(form);
      toast('Account created!', 'success');
      navigate('/', { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      toast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>Serviconnect</div>
          <p className={styles.subtitle}>Create your account</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            label="Phone (optional)"
            type="tel"
            name="phone"
            placeholder="+1 234 567 890"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth loading={loading}>
            Create Account
          </Button>
        </form>

        <div className={styles.footer}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
