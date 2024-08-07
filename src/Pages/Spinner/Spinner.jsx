import styles from './Spinner.module.scss';

export const Spinner = () => (
  <div className={styles.container}>
    <div className={styles.loader} />
  </div>
);
