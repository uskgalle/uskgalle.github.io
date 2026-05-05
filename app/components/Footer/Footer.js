import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Urban Sketchers Galle</div>
      <p className={styles.tags}>#urbansketchersgalle &nbsp;·&nbsp; #uskgalle</p>
      <p className={styles.sub}>Sketch Meet-Up #03 · Galle Dutch Fort, Sri Lanka</p>
    </footer>
  );
}
