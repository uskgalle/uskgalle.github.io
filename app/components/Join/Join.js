import styles from './Join.module.css';

const tags = ['Beginners', 'Hobbyists', 'Professionals', 'Students', 'All Ages', 'All Styles'];

export default function Join() {
  return (
    <section className={styles.join}>
      <p className={styles.label}>Who Can Join</p>
      <h2 className={styles.title}>
        This is for <em>everyone</em>
      </h2>

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span className={styles.tag} key={tag}>{tag}</span>
        ))}
      </div>

      <div className={styles.cta}>
        <a
          href="https://forms.gle/crcocgf98cX25bGo6"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
        >
          <i className="fa-solid fa-pen-nib"></i>
          Register for Meet-Up #03
        </a>
        <p className={styles.qrNote}>
          <i className="fa-solid fa-qrcode"></i>
          Scan the QR code in our social posts to register
        </p>
      </div>
    </section>
  );
}
