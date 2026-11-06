import styles from './SectionLabel.module.css';

const SectionLabel = ({ children, centered = false }: { children: string; centered?: boolean }) => {
  return (
    <div className={`${styles.wrap} ${centered ? styles.centered : ''}`}>
      <span className={styles.line} />
      <span className={styles.label}>{children}</span>
      {centered && <span className={styles.line} />}
    </div>
  );
};

export default SectionLabel;
