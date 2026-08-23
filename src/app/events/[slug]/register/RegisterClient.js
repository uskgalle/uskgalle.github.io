"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faLocationDot,
    faClock,
    faCheck,
    faCalendarPlus,
    faCopy,
    faShareNodes,
    faArrowRight,
    faArrowDown,
    faPaperPlane,
    faUsers,
    faPalette,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
    faWhatsapp,
    faFacebookF,
    faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function RegisterClient({ event }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        instagram: '',
        attendees: '1',
        experience: 'Enthusiast / Beginner',
        notes: '',
        agreedToGuidelines: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const defaultUrl = `https://urbansketchersgalle.github.io/events/${event.slug}/register`;
    const [currentUrl, setCurrentUrl] = useState(defaultUrl);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('register-section');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreedToGuidelines) {
            showToast('Please accept the event guidelines to confirm registration.');
            return;
        }

        setIsSubmitting(true);

        if (event.sheetEndpointUrl) {
            try {
                const params = new URLSearchParams({
                    event: event.title,
                    timestamp: new Date().toISOString(),
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    instagram: formData.instagram || '',
                    attendees: formData.attendees,
                    notes: formData.notes || '',
                });

                await fetch(event.sheetEndpointUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString(),
                });
            } catch (err) {
                console.error('Error submitting form data to endpoint:', err);
            }
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 500);
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl);
            showToast('Link copied to clipboard!');
        }
    };

    const getGoogleCalendarUrl = () => {
        const monthMap = {
            JAN: '01', FEB: '02', MAR: '03', MARCH: '03', APR: '04', APRIL: '04',
            MAY: '05', JUN: '06', JUNE: '06', JUL: '07', JULY: '07', AUG: '08',
            SEP: '09', OCT: '10', NOV: '11', DEC: '12',
        };
        const monthNum = monthMap[event.date.month.toUpperCase()] || '08';
        const dayStr = String(event.date.day).padStart(2, '0');
        const dateStr = `${event.year}${monthNum}${dayStr}`;
        const dates = `${dateStr}T083000/${dateStr}T123000`;

        const title = encodeURIComponent(`Urban Sketchers Galle - ${event.title}`);
        const details = encodeURIComponent(
            `${event.description}\n\nLocation: ${event.location}\nOrganized by Urban Sketchers Galle`
        );
        const location = encodeURIComponent(event.location);

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    };

    const shareText = `Join me at Urban Sketchers Galle for ${event.title} on ${event.date.day} ${event.date.month} ${event.year} at ${event.location}! Register here:`;
    const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    const twShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

    const whoCanJoinList = event.whoCanJoin || [
        'All age groups welcome',
        'All skill levels welcome — beginners to professionals',
    ];

    const whatToBringList = event.whatToBring || [
        'Pencil',
        'Pen / Ink',
        'Watercolour',
        'Markers',
        'iPad / Digital tools',
        'Or anything else you enjoy using',
    ];

    const contact = event.contact || {
        name: 'Sandeepa',
        phone: '+94 71 872 6368',
        whatsappLink: 'https://wa.me/94718726368',
    };

    return (
        <main className={styles.page}>
            {/* Back link */}
            <div className={styles.back}>
                <Link href="/events">
                    <FontAwesomeIcon icon={faArrowLeft} /> All Events
                </Link>
            </div>

            {/* Hero Header */}
            <header className={styles.hero}>
                <span className={styles.eyebrow}>
                    {event.upcoming ? 'Upcoming Sketch Meet' : 'Past Event'}
                </span>
                <h1 className={styles.title}>{event.title}</h1>
                <p className={styles.subtitle}>
                    Join fellow sketchers for on-location drawing across the streets and ramparts of Galle Fort. Free and open to all skill levels!
                </p>

                {event.upcoming && !isSubmitted && (
                    <button onClick={scrollToForm} className={styles.heroCtaBtn}>
                        Register Now <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                )}
            </header>

            {/* Showcase Section: Featured Event Image + Quick Facts */}
            <section className={styles.showcaseSection}>
                <div className={styles.showcaseGrid}>
                    <div className={styles.imageWrap}>
                        <img
                            src={event.image || '/gallery-images/meet-up-03/1.jpg'}
                            alt={event.title}
                        />
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.dateBadge} ${event.upcoming ? styles.dateBadgeUpcoming : ''}`}>
                                <span className={styles.dateYear}>{event.year}</span>
                                <div className={styles.dateMain}>
                                    <span className={styles.dateDay}>{event.date.day}</span>
                                    <span className={styles.dateMonth}>{event.date.month}</span>
                                </div>
                            </div>
                            <div className={styles.eventTitleGroup}>
                                <span className={styles.typeTag}>{event.type} Session</span>
                                <h2 className={styles.eventTitle}>{event.title}</h2>
                            </div>
                        </div>

                        <div className={styles.metaBlock}>
                            <div className={styles.metaRow}>
                                <FontAwesomeIcon icon={faLocationDot} className={styles.metaIcon} />
                                <div>
                                    <strong>Location:</strong> {event.location}
                                    <br />
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.mapLink}
                                    >
                                        View on Google Maps <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '0.7rem' }} />
                                    </a>
                                </div>
                            </div>
                            <div className={styles.metaRow}>
                                <FontAwesomeIcon icon={faClock} className={styles.metaIcon} />
                                <div>
                                    <strong>Time:</strong> {event.time}
                                </div>
                            </div>
                        </div>

                        <p className={styles.eventDesc}>{event.description}</p>
                    </div>
                </div>
            </section>

            {/* Clear Editorial Guidelines Section */}
            <section className={styles.guidelinesSection}>
                <h2 className={styles.sectionTitle}>Event Guidelines & Details</h2>
                <p className={styles.sectionSubtitle}>
                    Everything you need to know before joining us on-location in Galle Fort.
                </p>

                <div className={styles.guidelinesGrid}>
                    {/* Who can join */}
                    <div className={styles.guideCard}>
                        {/* <div className={styles.guideCardImageWrap}>
                            <img
                                src={event.whoCanJoinImage || '/doodles/who-can-join.jpg'}
                                alt="Who Can Join?"
                                className={styles.guideCardImg}
                            />
                        </div> */}
                        <div className={styles.guideCardContent}>
                            <div className={styles.guideCardHeader}>
                                <FontAwesomeIcon icon={faUsers} className={styles.guideIcon} />
                                <h3 className={styles.guideTitle}>Who Can Join?</h3>
                            </div>
                            <ul className={styles.guideList}>
                                {whoCanJoinList.map((item, i) => (
                                    <li key={i} className={styles.guideItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* What to bring */}
                    <div className={styles.guideCard}>
                        {/*  <div className={styles.guideCardImageWrap}>
                            <img
                                src={event.whatToBringImage || '/doodles/what-to-bring.jpg'}
                                alt="What To Bring"
                                className={styles.guideCardImg}
                            />
                        </div> */}
                        <div className={styles.guideCardContent}>
                            <div className={styles.guideCardHeader}>
                                <FontAwesomeIcon icon={faPalette} className={styles.guideIcon} />
                                <h3 className={styles.guideTitle}>What To Bring</h3>
                            </div>
                            <ul className={styles.guideList}>
                                {whatToBringList.map((item, i) => (
                                    <li key={i} className={styles.guideItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className={styles.guideNote}>
                                {event.whatToBringNote || 'No specific tools required — all styles are welcome.'}
                            </p>
                        </div>
                    </div>

                    {/* Contact & Inquiries */}
                    <div className={styles.guideCard}>
                        {/* <div className={styles.guideCardImageWrap}>
                            <img
                                src={event.contactImage || '/doodles/contact.jpg'}
                                alt="Details & Inquiries"
                                className={styles.guideCardImg}
                            />
                        </div> */}
                        <div className={styles.guideCardContent}>
                            <div className={styles.guideCardHeader}>
                                <FontAwesomeIcon icon={faPhone} className={styles.guideIcon} />
                                <h3 className={styles.guideTitle}>Details & Inquiries</h3>
                            </div>
                            <div className={styles.contactBlock}>
                                <div className={styles.contactRow}>
                                    <strong>Contact:</strong> {contact.name}
                                </div>
                                <div className={styles.contactRow}>
                                    <strong>WhatsApp:</strong> {contact.phone}
                                </div>
                                <a
                                    href={contact.whatsappLink || `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.contactLink}
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} className={styles.waIcon} /> Message on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Web Registration Form Section */}
            <section id="register-section" className={styles.formSection}>
                {!event.upcoming ? (
                    <div className={styles.closedNotice}>
                        <h2 className={styles.closedTitle}>Registration Closed</h2>
                        <p className={styles.closedText}>
                            This sketch meet-up has already taken place. Browse our recap photos or check upcoming events.
                        </p>
                        <div className={styles.closedActions}>
                            {event.recap && (
                                <Link href={`/events/${event.slug}`} className={styles.primaryBtn}>
                                    View Event Recap <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            )}
                            <Link href="/events" className={styles.secondaryBtn}>
                                View All Events
                            </Link>
                        </div>
                    </div>
                ) : isSubmitted ? (
                    <div className={styles.successCard}>
                        <div className={styles.checkCircle}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <h2 className={styles.successTitle}>Registration Confirmed</h2>
                        <p className={styles.successBody}>
                            Thank you, <strong>{formData.fullName}</strong>. Your spot is reserved for <strong>{event.title}</strong> on <strong>{event.date.day} {event.date.month} {event.year}</strong>.
                        </p>

                        <a
                            href="https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappInviteBtn}
                        >
                            <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '1.2rem' }} />
                            Join WhatsApp Group for Live Meetup Updates
                        </a>

                        <div className={styles.calendarRow}>
                            <a
                                href={getGoogleCalendarUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.calBtn}
                            >
                                <FontAwesomeIcon icon={faCalendarPlus} /> Add to Google Calendar
                            </a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className={styles.sectionTitle}>Register For This Meet-Up</h2>
                        <p className={styles.sectionSubtitle}>
                            Fill out the short form below to confirm your participation.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Full Name <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        placeholder="e.g. Ama Perera"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Email Address <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        WhatsApp / Phone <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+94 77 123 4567"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Instagram Handle <span style={{ fontWeight: 400, color: 'var(--color-muted)' }}>(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        placeholder="@yourusername"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Number of Sketchers</label>
                                    <select
                                        name="attendees"
                                        value={formData.attendees}
                                        onChange={handleChange}
                                        className={styles.select}
                                    >
                                        <option value="1">1 (Just me)</option>
                                        <option value="2">2 Sketchers</option>
                                        <option value="3">3 Sketchers</option>
                                        <option value="4">4+ Group</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Notes or Questions <span style={{ fontWeight: 400, color: 'var(--color-muted)' }}>(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="notes"
                                        placeholder="Any notes for the organizers..."
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                </div>

                                {/* Event Agreement Checkbox */}
                                <div className={`${styles.fullWidth} ${styles.agreementRow}`}>
                                    <input
                                        type="checkbox"
                                        id="agreedToGuidelines"
                                        name="agreedToGuidelines"
                                        required
                                        checked={formData.agreedToGuidelines}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="agreedToGuidelines" className={styles.agreementText}>
                                        <strong>Event Agreement:</strong> I am comfortable sketching outdoors & walking between locations, and I consent to photography/video recording for Urban Sketchers Galle community channels.
                                    </label>
                                </div>

                                <div className={styles.fullWidth}>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={styles.submitBtn}
                                    >
                                        {isSubmitting ? (
                                            'Registering...'
                                        ) : (
                                            <>
                                                Confirm Registration <FontAwesomeIcon icon={faPaperPlane} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </section>

            {/* Social Share Bar Section */}
            <div className={styles.shareSection}>
                <h3 className={styles.shareTitle}>
                    <FontAwesomeIcon icon={faShareNodes} style={{ marginRight: '0.4rem', color: 'var(--color-tan)' }} />
                    Share this Event on Socials
                </h3>
                <p className={styles.shareSub}>
                    Invite your fellow artist friends and sketchers to join us at {event.title}!
                </p>

                <div className={styles.shareBar}>
                    <a
                        href={waShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.shareBtn} ${styles.shareWa}`}
                    >
                        <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                    </a>
                    <a
                        href={fbShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.shareBtn} ${styles.shareFb}`}
                    >
                        <FontAwesomeIcon icon={faFacebookF} /> Facebook
                    </a>
                    <a
                        href={twShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.shareBtn} ${styles.shareTw}`}
                    >
                        <FontAwesomeIcon icon={faXTwitter} /> X / Twitter
                    </a>
                    <button onClick={copyToClipboard} className={`${styles.shareBtn} ${styles.shareCopy}`}>
                        <FontAwesomeIcon icon={faCopy} /> Copy Link
                    </button>
                </div>

                {toastMessage && <span className={styles.toast}>{toastMessage}</span>}
            </div>
        </main>
    );
}
