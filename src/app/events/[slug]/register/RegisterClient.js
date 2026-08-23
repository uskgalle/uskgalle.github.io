"use client";

import { useState } from 'react';
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
    faPaperPlane,
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
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const currentUrl = typeof window !== 'undefined'
        ? window.location.href
        : `https://urbansketchersgalle.github.io/events/${event.slug}/register`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 500);
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
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

    const downloadIcsFile = () => {
        const monthMap = {
            JAN: '01', FEB: '02', MAR: '03', MARCH: '03', APR: '04', APRIL: '04',
            MAY: '05', JUN: '06', JUNE: '06', JUL: '07', JULY: '07', AUG: '08',
            SEP: '09', OCT: '10', NOV: '11', DEC: '12',
        };
        const monthNum = monthMap[event.date.month.toUpperCase()] || '08';
        const dayStr = String(event.date.day).padStart(2, '0');
        const dateStr = `${event.year}${monthNum}${dayStr}`;

        const icsData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Urban Sketchers Galle//EN',
            'BEGIN:VEVENT',
            `SUMMARY:Urban Sketchers Galle - ${event.title}`,
            `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
            `LOCATION:${event.location}`,
            `DTSTART:${dateStr}T083000`,
            `DTEND:${dateStr}T123000`,
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `${event.slug}-event.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const shareText = `Join me at Urban Sketchers Galle for ${event.title} on ${event.date.day} ${event.date.month} ${event.year} at ${event.location}! Register here:`;
    const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    const twShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

    return (
        <main className={styles.page}>
            {/* Back link */}
            <div className={styles.back}>
                <Link href="/events">
                    <FontAwesomeIcon icon={faArrowLeft} /> All Events
                </Link>
            </div>

            {/* Header */}
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    {event.upcoming ? 'Upcoming Sketch Meet' : 'Past Event'}
                </span>
                <h1 className={styles.title}>{event.title} Registration</h1>
                <p className={styles.subtitle}>
                    Reserve your spot for our upcoming sketching gathering in Galle Fort. Free and open to sketchers of all skill levels!
                </p>
            </header>

            {/* Grid */}
            <div className={styles.grid}>
                {/* Event Summary Card */}
                <div className={styles.eventCard}>
                    <div className={styles.cardHeader}>
                        {/* Date badge matching site style */}
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

                    <div className={styles.tipsBox}>
                        <span className={styles.tipsTitle}>🎨 What to bring:</span>
                        Sketchbook or watercolor paper, favorite drawing pens or paints, a folding stool, and sun protection!
                    </div>
                </div>

                {/* Right Form / Success / Closed State */}
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
                        <h2 className={styles.successTitle}>You're Registered!</h2>
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
                            Join WhatsApp Group for Meetup Updates
                        </a>

                        <div className={styles.calendarRow}>
                            <a
                                href={getGoogleCalendarUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.calBtn}
                            >
                                <FontAwesomeIcon icon={faCalendarPlus} /> Google Calendar
                            </a>
                            <button onClick={downloadIcsFile} className={styles.calBtn}>
                                <FontAwesomeIcon icon={faCalendarPlus} /> .ics File
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Reserve Your Spot</h2>
                        <p className={styles.formSubtitle}>
                            Fill in your details below to join us for sketching.
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
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
                                <textarea
                                    name="notes"
                                    rows="3"
                                    placeholder="Any questions or special notes for the session..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className={styles.textarea}
                                />
                            </div>

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
                        </form>
                    </div>
                )}
            </div>

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
