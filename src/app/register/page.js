'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPen,
  faCheckCircle,
  faUserPlus,
  faSpinner,
  faArrowLeft,
  faArrowRight,
  faCamera,
  faUpload,
  faExternalLinkAlt,
  faImage,
  faPalette,
  faCheck,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// Optional: Set your Google Apps Script Web App URL or Sheets API endpoint here,
// or via environment variable NEXT_PUBLIC_GOOGLE_SHEET_URL
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzRkoGiI3HDReyKlPOmYcknS-WbbY4EHcPks1Sv7nRWfZG1ip3JQozn95i4bQ5p1uEN/exec";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'photo'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    instagram: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check URL query param or hash on mount (e.g., ?tab=photo or #photo)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');
      const hash = window.location.hash;
      if (tabParam === 'photo' || hash === '#photo') {
        setActiveTab('photo');
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      instagram: formData.instagram || 'Not provided',
      uploadedPhoto: 'Next Step / In Progress',
      timestamp: new Date().toISOString(),
    };

    console.log('====================================');
    console.log('🟢 USK GALLE - REGISTER PROFILE DATA');
    console.log('====================================');
    console.table({
      Name: payload.name,
      Email: payload.email,
      Bio: payload.bio,
      Instagram: payload.instagram,
      SubmittedAt: payload.timestamp,
    });
    console.log('Payload JSON:', JSON.stringify(payload, null, 2));

    // If Google Sheets endpoint is configured, submit to Sheets API / Apps Script
    if (GOOGLE_SHEETS_ENDPOINT) {
      try {
        const formDataPayload = new FormData();
        formDataPayload.append('name', payload.name);
        formDataPayload.append('email', payload.email);
        formDataPayload.append('bio', payload.bio);
        formDataPayload.append('instagram', payload.instagram);
        formDataPayload.append('uploadedPhoto', payload.uploadedPhoto);
        formDataPayload.append('timestamp', payload.timestamp);

        await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          body: formDataPayload,
          mode: 'no-cors', // standard for Google Apps Script Web Apps
        });
        console.log('Successfully posted data to Google Sheets endpoint');
      } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    // Switch to the photo upload tab so user can immediately complete step 2
    setActiveTab('photo');
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', bio: '', instagram: '' });
    setIsSubmitted(false);
    setActiveTab('info');
  };

  return (
    <main className={styles.page}>
      <div className={styles.back}>
        <Link href="/artists">
          <FontAwesomeIcon icon={faArrowLeft} /> All Artists
        </Link>
      </div>

      <header className={styles.hero}>
        <span className={styles.eyebrow}>Join Our Community</span>
        <h1 className={styles.title}>Artist Registration</h1>
        <p className={styles.subtitle}>
          Create your artist profile or upload your profile picture to showcase your artworks.
        </p>
      </header>

      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'info' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('info')}
          aria-selected={activeTab === 'info'}
        >
          <span className={styles.tabBadge}>
            {isSubmitted ? <FontAwesomeIcon icon={faCheck} /> : '1'}
          </span>
          <div className={styles.tabTextWrap}>
            <span className={styles.tabTitle}>
              <FontAwesomeIcon icon={faUser} /> Register Info
            </span>
            <span className={styles.tabSubtitle}>Basic artist details</span>
          </div>
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'photo' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('photo')}
          aria-selected={activeTab === 'photo'}
        >
          <span className={styles.tabBadge}>2</span>
          <div className={styles.tabTextWrap}>
            <span className={styles.tabTitle}>
              <FontAwesomeIcon icon={faCamera} /> Upload Profile Picture
            </span>
            <span className={styles.tabSubtitle}>New & existing artists</span>
          </div>
        </button>
      </div>

      {/* Tab 1: Register Info */}
      {activeTab === 'info' && (
        <div className={styles.formCard}>
          {isSubmitted ? (
            <div className={styles.successCard}>
              <div className={styles.checkCircle}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h2 className={styles.successTitle}>Profile Info Submitted!</h2>
              <p className={styles.successText}>
                Thank you for registering, <strong>{formData.name}</strong>. Your artist details have been received.
              </p>
              <div className={styles.infoBox}>
                We will manually review and create your profile. A confirmation will be sent to <strong>{formData.email}</strong>.
              </div>

              <div className={styles.nextStepPrompt}>
                <p className={styles.nextStepText}>
                  <strong>Final Step:</strong> Make sure to upload your profile picture so your artist card looks complete!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('photo')}
                  className={styles.nextStepBtn}
                >
                  <FontAwesomeIcon icon={faCamera} /> Go to Step 2: Upload Photo <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>

              <div className={styles.actionGroup}>
                <button type="button" onClick={handleReset} className={styles.backBtn}>
                  Register Another Profile
                </button>
                <Link href="/artists" className={styles.backBtn}>
                  <FontAwesomeIcon icon={faArrowLeft} /> All Artists
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formIntro}>
                <h3 className={styles.formSectionTitle}>Step 1: Your Artist Information</h3>
                <p className={styles.formSectionDesc}>
                  Fill in your details below. You will be able to upload your profile picture right after submitting this step!
                </p>
              </div>

              {/* Name */}
              <div className={styles.fieldGroup}>
                <label htmlFor="name" className={styles.label}>
                  <FontAwesomeIcon icon={faUser} /> Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                  <FontAwesomeIcon icon={faEnvelope} /> Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. jane@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <span className={styles.helpText}>
                  Your email stays private and won't be displayed publicly. See <Link href="/artists" target="_blank" className={styles.helpLink}>how artist profiles look</Link>.
                </span>
              </div>

              {/* Short Bio */}
              <div className={styles.fieldGroup}>
                <label htmlFor="bio" className={styles.label}>
                  <FontAwesomeIcon icon={faPen} /> Short Bio <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  required
                  placeholder="Tell us a little bit about yourself and your sketching journey..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows={4}
                />
              </div>

              {/* Instagram */}
              <div className={styles.fieldGroup}>
                <label htmlFor="instagram" className={styles.label}>
                  <FontAwesomeIcon icon={faInstagram} /> Instagram <span className={styles.optionalTag}>(Optional)</span>
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="e.g. @janedoe_sketches or instagram.com/janedoe"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.nextHintBox}>
                <FontAwesomeIcon icon={faCircleInfo} className={styles.hintIcon} />
                <span>
                  <strong>Photo upload is next:</strong> Once you click <em>Register & Continue</em>, you'll be directed to the photo upload section.
                </span>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin /> Submitting Info...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserPlus} /> Register & Continue to Photo <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Upload / Update Profile Picture */}
      {activeTab === 'photo' && (
        <div className={styles.formCard}>
          <div className={styles.photoTabContainer}>
            {isSubmitted && (
              <div className={styles.successBanner}>
                <div className={styles.bannerIcon}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div>
                  <h4 className={styles.bannerTitle}>Details Registered Successfully!</h4>
                  <p className={styles.bannerText}>
                    Welcome, <strong>{formData.name}</strong>! Please complete Step 2 by submitting your profile picture below.
                  </p>
                </div>
              </div>
            )}

            <div className={styles.photoHeader}>
              <div className={styles.photoIconBadge}>
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div>
                <h3 className={styles.photoSectionTitle}>Upload / Update Profile Picture</h3>
                <p className={styles.photoSectionSubtitle}>
                  For new registrations or already registered artists updating their profile picture.
                </p>
              </div>
            </div>

            <div className={styles.instructionsCard}>
              <h4 className={styles.instructionsTitle}>How it works:</h4>
              <ol className={styles.instructionsList}>
                <li>
                  Click the <strong>Open Photo Upload Form</strong> button below.
                </li>
                <li>
                  Upload a clear portrait or square photo of yourself and enter your name/email.
                </li>
                <li>
                  Our team will match it with your profile details and update your artist card on USK Galle!
                </li>
              </ol>
            </div>

            <div className={styles.photoActionWrap}>
              <a
                href="https://forms.gle/VnmFnsi5VtuJhxhw9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mainUploadBtn}
              >
                <FontAwesomeIcon icon={faUpload} /> Open Photo Upload Form <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.externalIcon} />
              </a>
              <span className={styles.openFormNote}>
                Opens our Google Form in a new tab. You can safely upload your photo file there.
              </span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.photoFooterActions}>
              <div className={styles.footerNote}>
                <span className={styles.footerNoteTitle}>Want to submit artwork as well?</span>
                <p className={styles.footerNoteText}>You can submit your sketches anytime to be featured on your profile.</p>
              </div>
              <div className={styles.actionGroup}>
                <a
                  href="https://forms.gle/6siWSXRDP4S98xPQA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.submitArtworkBtn}
                >
                  <FontAwesomeIcon icon={faPalette} /> Submit Artwork <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.externalIcon} />
                </a>
                <Link href="/artists" className={styles.backBtn}>
                  <FontAwesomeIcon icon={faArrowLeft} /> View Artists
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
