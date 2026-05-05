import styles from './WhatToBring.module.css';

const tools = [
  { icon: 'fa-solid fa-pencil',              label: 'Pencil' },
  { icon: 'fa-solid fa-pen',                 label: 'Pen / Ink' },
  { icon: 'fa-solid fa-palette',             label: 'Watercolour' },
  { icon: 'fa-solid fa-paint-brush',         label: 'Markers' },
  { icon: 'fa-solid fa-tablet-screen-button',label: 'iPad / Digital' },
  { icon: 'fa-solid fa-wand-sparkles',       label: 'Any medium you enjoy' },
];

export default function WhatToBring() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>What to Bring</p>
        <h2 className={styles.title}>
          Your tools,<br /><em>any medium</em>
        </h2>

        <div className={styles.grid}>
          {tools.map((tool) => (
            <div className={styles.item} key={tool.label}>
              <i className={`${tool.icon} ${styles.icon}`}></i>
              <span>{tool.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          <i className="fa-solid fa-circle-info"></i>
          No specific tools required — all styles are welcome.
        </p>
      </div>
    </section>
  );
}
