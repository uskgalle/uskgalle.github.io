import styles from './Details.module.css';

const cells = [
  {
    icon: 'fa-regular fa-calendar-days',
    label: 'Date',
    value: <>Sunday<br />10 May 2026</>,
  },
  {
    icon: 'fa-regular fa-clock',
    label: 'Time',
    value: <>8:30 AM<br />– 12:30 PM</>,
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Meet-up Point',
    value: (

      <a href="https://maps.app.goo.gl/T9GhkDAA7oeHwv289"
        target="_blank"
        rel="noopener noreferrer"
      >
        ART'O'SAN Gallery<br />No 47/1, Pedlars St
        <span> <i className="fa-solid fa-arrow-up-right-from-square"></i></span>
      </a>
    ),
  },
  {
    icon: 'fa-solid fa-palette',
    label: 'Who Can Join',
    value: <>All ages &amp;<br />skill levels</>,
  },
];

export default function Details() {
  return (
    <section className={styles.details}>
      <div className={styles.grid}>
        {cells.map((cell) => (
          <div className={styles.cell} key={cell.label}>
            <i className={`${cell.icon} ${styles.icon}`}></i>
            <div className={styles.label}>{cell.label}</div>
            <div className={styles.value}>{cell.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
