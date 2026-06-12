import styles from './Button.module.css';
import { cva } from '../../../lib/cva';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      ghost: styles.ghost,
      accent: styles.accent,
      danger: styles.danger,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    fullWidth: {
      true: styles.fullWidth,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

export default function Button({
  children,
  variant,
  size,
  fullWidth,
  loading,
  disabled,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${buttonVariants({ variant, size, fullWidth })} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
}
