import styles from './PageBackground.module.css';

export default function PageBackground() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
          <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>
        <ellipse cx="200"  cy="150" rx="350" ry="280" fill="#c49a2a" opacity="0.07" filter="url(#blur1)" />
        <ellipse cx="1300" cy="200" rx="280" ry="220" fill="#5c7a5a" opacity="0.07" filter="url(#blur1)" />
        <ellipse cx="700"  cy="700" rx="400" ry="300" fill="#b84a2e" opacity="0.05" filter="url(#blur2)" />
        <ellipse cx="100"  cy="800" rx="200" ry="150" fill="#4a6b8a" opacity="0.06" filter="url(#blur1)" />
        <ellipse cx="1350" cy="750" rx="250" ry="200" fill="#c49a2a" opacity="0.06" filter="url(#blur2)" />
      </svg>
    </div>
  );
}
