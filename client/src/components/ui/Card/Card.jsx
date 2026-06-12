import styles from './Card.module.css';

export default function Card({
  children,
  className = '',
  padding = 'md',
  flat,
  onClick,
  ...props
}) {
  const classes = [
    styles.card,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    flat && styles.flat,
    onClick && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
