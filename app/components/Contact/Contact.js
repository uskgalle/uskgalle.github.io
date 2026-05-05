import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h3 className={styles.heading}>Stay Connected</h3>
          <div className={styles.links}>
            <a
              href="https://www.instagram.com/urbansketchersgalle"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <i className="fa-brands fa-instagram"></i>
              @urbansketchersgalle
            </a>
            <a
              href="https://www.facebook.com/share/1L8GtVnbzg"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <i className="fa-brands fa-facebook"></i>
              Urban Sketchers Galle
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>Inquiries</h3>
          <div className={styles.links}>
            <span className={styles.info}>
              <i className="fa-brands fa-whatsapp"></i>
              WhatsApp: Sandeepa
            </span>
            <a href="https://wa.me/94718472636" className={styles.link}>
              <i className="fa-solid fa-mobile-screen"></i>
              +94 71 8472 636
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
