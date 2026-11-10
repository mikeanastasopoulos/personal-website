import styles from "./StudioCredit.module.css";

const StudioCredit = ({ label }: { label: string }) => (
  <a href="https://kalimeris.info" className={styles.credit}>
    <span className={styles.label}>{label}</span>
    <strong className={styles.name}>Ground Work Studio</strong>
  </a>
);

export default StudioCredit;
