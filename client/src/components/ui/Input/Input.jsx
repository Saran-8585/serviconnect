import styles from './Input.module.css';

export default function Input({
  label,
  error,
  textarea,
  className = '',
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const Component = textarea ? 'textarea' : 'input';
  const inputClasses = `${textarea ? styles.textarea : ''} ${styles.input} ${error ? styles.error : ''} ${className}`;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <Component id={inputId} className={inputClasses} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
