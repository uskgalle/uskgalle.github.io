'use client';

import { useEffect, useRef } from 'react';

const galleryImages = [
  { id: 1, label: 'Sketching at Galle Fort' },
  { id: 2, label: 'Watercolour session' },
  { id: 3, label: 'Urban sketchers gathering' },
  { id: 4, label: 'Architecture studies' },
  { id: 5, label: 'Street scenes' },
  { id: 6, label: 'Fort walls at dawn' },
  { id: 7, label: 'Pen & ink details' },
  { id: 8, label: 'Group sketch share' },
];

export default function Home() {
  const partCardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    partCardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Watercolour background blobs */}
      <div className="page-bg" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="80" />
            </filter>
          </defs>
          <ellipse cx="200" cy="150" rx="350" ry="280" fill="#c49a2a" opacity="0.07" filter="url(#blur1)" />
          <ellipse cx="1300" cy="200" rx="280" ry="220" fill="#5c7a5a" opacity="0.07" filter="url(#blur1)" />
          <ellipse cx="700" cy="700" rx="400" ry="300" fill="#b84a2e" opacity="0.05" filter="url(#blur2)" />
          <ellipse cx="100" cy="800" rx="200" ry="150" fill="#4a6b8a" opacity="0.06" filter="url(#blur1)" />
          <ellipse cx="1350" cy="750" rx="250" ry="200" fill="#c49a2a" opacity="0.06" filter="url(#blur2)" />
        </svg>
      </div>

      <div className="main-content">
        {/* ===== HERO ===== */}
        <section className="hero">
          <p className="hero-badge">✦ Urban Sketchers Galle ✦</p>

          <div className="hero-number" aria-hidden="true">#03</div>

          <div className="hero-title-wrap">
            <h1 className="hero-title">
              Sketch<br />
              <span>Meet-Up</span>
            </h1>
          </div>

          <p className="hero-tagline">Meet · Sketch · Share</p>

          <div className="hero-dots">
            <div className="hero-dot" />
            <div className="hero-dot" />
            <div className="hero-dot" />
          </div>

          <div className="hero-meta">
            <span className="hero-meta-item">
              <i className="fa-regular fa-calendar icon"></i>
              Sunday, 10th May 2026
            </span>
            <span className="hero-meta-item">
              <i className="fa-regular fa-clock icon"></i>
              8.30 AM – 12.30 PM
            </span>
            <span className="hero-meta-item">
              <i className="fa-solid fa-location-dot icon"></i>
              ART'O'SAN Gallery, Galle Fort
            </span>
          </div>

          <div className="hero-cta">
            <a
              href="https://forms.gle/crcocgf98cX25bGo6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-register"
            >
              Register Now
            </a>
          </div>

          <div className="scroll-hint" aria-hidden="true">
            <span>scroll</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* ===== SKETCH DIVIDER ===== */}
        <div className="sketch-divider" aria-hidden="true">
          <svg viewBox="0 0 900 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 20 Q 80 8, 150 22 Q 220 36, 290 18 Q 360 4, 430 20 Q 500 36, 570 16 Q 640 2, 710 22 Q 780 38, 850 18 Q 880 12, 890 20"
              stroke="#8b6914"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{ animation: 'drawLine 2s 0.8s ease forwards' }}
            />
          </svg>
        </div>

        {/* ===== ABOUT ===== */}
        <section className="section">
          <p className="section-label">About the Event</p>
          <h2 className="section-title">
            A morning inside<br />
            <em>the historic Fort</em>
          </h2>
          <p style={{ maxWidth: '620px', fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--ink-light)' }}>
            Join us for a relaxed and inspiring morning of sketching, walking, observing,
            and sharing together within the timeless streets of the Historic Galle Dutch Fort.
            Open to all — every age, every skill level, every medium.
          </p>

          <div style={{ marginTop: '40px', opacity: 0.15 }} aria-hidden="true">
            <svg width="120" height="40" viewBox="0 0 120 40">
              <line x1="10" y1="20" x2="100" y2="20" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
              <path d="M100 15 L112 20 L100 25 Z" fill="var(--ink)" />
              <circle cx="10" cy="20" r="3" fill="var(--sepia)" />
            </svg>
          </div>
        </section>

        {/* ===== DETAILS STRIP ===== */}
        <section className="details-strip">
          <div className="details-grid">
            <div className="detail-cell">
              <i className="fa-regular fa-calendar-days detail-icon"></i>
              <div className="detail-label">Date</div>
              <div className="detail-value">Sunday<br />10 May 2026</div>
            </div>
            <div className="detail-cell">
              <i className="fa-regular fa-clock detail-icon"></i>
              <div className="detail-label">Time</div>
              <div className="detail-value">8:30 AM<br />– 12:30 PM</div>
            </div>
            <div className="detail-cell">
              <i className="fa-solid fa-location-dot detail-icon"></i>
              <div className="detail-label">Meet-up Point</div>
              <div className="detail-value">ART'O'SAN Gallery<br />No 47/1, Pedlars St</div>
            </div>
            <div className="detail-cell">
              <i className="fa-solid fa-palette detail-icon"></i>
              <div className="detail-label">Who Can Join</div>
              <div className="detail-value">All ages &<br />skill levels</div>
            </div>
          </div>
        </section>

        {/* ===== PROGRAMME ===== */}
        <section className="programme-section">
          <div className="programme-inner">
            <p className="section-label">Programme for the Day</p>
            <h2 className="section-title" style={{ color: 'var(--ink)' }}>
              How the day<br /><em>unfolds</em>
            </h2>

            <div className="programme-parts">
              <div className="part-card" ref={(el) => (partCardsRef.current[0] = el)}>
                <div className="part-number">1</div>
                <div className="part-content">
                  <h3>Start &amp; Sketch</h3>
                  <ul className="part-items">
                    <li>Mini sketching session at ART'O'SAN Gallery</li>
                    <li>Warm-up exercises with simple, practical sketching techniques</li>
                    <li>Continuing key learnings from Sketch Meet-Up #01 &amp; #02</li>
                  </ul>
                </div>
              </div>

              <div className="part-card" ref={(el) => (partCardsRef.current[1] = el)}>
                <div className="part-number">2</div>
                <div className="part-content">
                  <h3>Walk &amp; Capture</h3>
                  <ul className="part-items">
                    <li>Urban Sketch Walk through Galle Fort</li>
                    <li>Visit 2–3 selected locations within the Fort</li>
                    <li>Observe, explore, and sketch directly from life</li>
                  </ul>
                </div>
              </div>

              <div className="part-card" ref={(el) => (partCardsRef.current[2] = el)}>
                <div className="part-number">3</div>
                <div className="part-content">
                  <span className="part-badge">Optional · Separate Registration</span>
                  <h3>Urban Sketching Book Review</h3>
                  <p className="part-optional">
                    <i className="fa-regular fa-clock"></i> 1:30 PM – 3:30 PM
                  </p>
                  <ul className="part-items" style={{ marginTop: '10px' }}>
                    <li>Review and discuss selected Urban Sketchers publications</li>
                    <li>Explore key ideas, sketching approaches, and city observation</li>
                    <li>Short discussions and light guided exercises</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT TO BRING ===== */}
        <section className="bring-section">
          <p className="section-label">What to Bring</p>
          <h2 className="section-title">
            Your tools,<br /><em>any medium</em>
          </h2>

          <div className="bring-grid">
            {[
              { icon: 'fa-solid fa-pencil', label: 'Pencil' },
              { icon: 'fa-solid fa-pen', label: 'Pen / Ink' },
              { icon: 'fa-solid fa-palette', label: 'Watercolour' },
              { icon: 'fa-solid fa-paint-brush', label: 'Markers' },
              { icon: 'fa-solid fa-tablet-screen-button', label: 'iPad / Digital' },
              { icon: 'fa-solid fa-wand-sparkles', label: 'Any medium you enjoy' },
            ].map((item) => (
              <div className="bring-item" key={item.label}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="bring-note">
            No specific tools required — all styles are welcome.
          </p>
        </section>

        {/* ===== GALLERY ===== */}
        <section className="gallery-section">
          <div className="gallery-inner">
            <p className="section-label">From Past Events</p>
            <h2 className="section-title">
              Sketches &amp; moments<br /><em>captured</em>
            </h2>

            <div className="gallery-grid">
              {galleryImages.map((img) => (
                <div className="gallery-item" key={img.id}>
                  <div className="gallery-placeholder">
                    <i className="fa-solid fa-pen-nib" style={{ fontSize: '1.5rem' }}></i>
                    <br />
                    <span style={{ fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                      {img.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="gallery-caption">
              Replace placeholders with images from your past meet-ups ✦
            </p>
          </div>
        </section>

        {/* ===== JOIN / CTA ===== */}
        <section className="join-section">
          <p className="section-label">Who Can Join</p>
          <h2 className="section-title">
            This is for <em>everyone</em>
          </h2>

          <div className="join-who">
            {['Beginners', 'Hobbyists', 'Professionals', 'Students', 'All Ages', 'All Styles'].map((tag) => (
              <span className="who-tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="cta-group">
            <a
              href="https://forms.gle/crcocgf98cX25bGo6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-register"
            >
              Register for Meet-Up #03
            </a>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem', color: 'var(--pencil)' }}>
              Scan the QR code in our social posts to register
            </p>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="contact-section">
          <div className="contact-grid">
            <div>
              <h3 className="contact-heading">Stay Connected</h3>
              <div className="social-links">
                <div className="contact-item">
                  <i className="fa-brands fa-instagram"></i>
                  <a href="https://www.instagram.com/urbansketchersgalle" target="_blank" rel="noopener noreferrer">
                    @urbansketchersgalle
                  </a>
                </div>
                <div className="contact-item">
                  <i className="fa-brands fa-facebook"></i>
                  <a href="https://www.facebook.com/share/1L8GtVnbzg" target="_blank" rel="noopener noreferrer">
                    Urban Sketchers Galle
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="contact-heading">Inquiries</h3>
              <div className="contact-item">
                <i className="fa-brands fa-whatsapp"></i>
                <span>WhatsApp: Sandeepa</span>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-mobile-screen"></i>
                <a href="https://wa.me/94718472636">+94 71 8472 636</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <div className="footer-logo">Urban Sketchers Galle</div>
          <p>#urbansketchersgalle &nbsp;·&nbsp; #uskgalle</p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>
            Sketch Meet-Up #03 · Galle Dutch Fort, Sri Lanka
          </p>
        </footer>
      </div>
    </>
  );
}
