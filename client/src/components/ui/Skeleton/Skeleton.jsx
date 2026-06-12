import styles from './Skeleton.module.css';

export default function Skeleton({ variant = 'text', width, height, className = '' }) {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
