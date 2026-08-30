'use client';

import { useState } from 'react';
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
  faCamera,
  faUpload,
  faExternalLinkAlt,
  faImage,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// Optional: Set your Google Apps Script Web App URL or Sheets API endpoint here,
// or via environment variable NEXT_PUBLIC_GOOGLE_SHEET_URL
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzRkoGiI3HDReyKlPOmYcknS-WbbY4EHcPks1Sv7nRWfZG1ip3JQozn95i4bQ5p1uEN/exec";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    instagram: '',
    uploadedPhoto: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      uploadedPhoto: formData.uploadedPhoto ? 'Yes' : 'No / Pending',
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
      'Uploaded Photo': payload.uploadedPhoto,
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
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', bio: '', instagram: '', uploadedPhoto: false });
    setIsSubmitted(false);
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
        <h1 className={styles.title}>Register Profile</h1>
        <p className={styles.subtitle}>
          Create your artist profile to showcase your artworks.
        </p>
      </header>

      {isSubmitted ? (
        <div className={styles.successCard}>
          <div className={styles.checkCircle}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h2 className={styles.successTitle}>Profile Registered!</h2>
          <p className={styles.successText}>
            Thank you for registering, <strong>{formData.name}</strong>. Your details have been received.
          </p>
          <div className={styles.infoBox}>
            We will manually create your profile and send a confirmation email to <strong>{formData.email}</strong>.
          </div>

          <div className={styles.photoReminderBox}>
            <p className={styles.photoReminderText}>
              <FontAwesomeIcon icon={faCamera} /> <strong>Profile Picture:</strong>{' '}
              {formData.uploadedPhoto
                ? 'Thank you for indicating that you uploaded your photo!'
                : 'Haven’t uploaded a profile picture yet? You can upload it anytime via our upload form.'}
            </p>
            <a
              href="https://forms.gle/VnmFnsi5VtuJhxhw9"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryUploadBtn}
            >
              <FontAwesomeIcon icon={faUpload} /> Upload Profile Picture <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
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
              <FontAwesomeIcon icon={faArrowLeft} /> All Artists
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
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

            {/* Profile Picture (Optional) */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <FontAwesomeIcon icon={faCamera} /> Profile Picture <span className={styles.optionalTag}>(Optional)</span>
              </label>

              <div className={styles.photoUploadCard}>
                <div className={styles.photoUploadHeader}>
                  <div className={styles.photoIconBadge}>
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                  <div className={styles.photoUploadMeta}>
                    <h4 className={styles.photoUploadTitle}>Upload Profile Picture</h4>
                    <p className={styles.photoUploadDesc}>
                      To display your picture on your artist card, please submit it via our dedicated photo submission form.
                    </p>
                  </div>
                </div>

                <div className={styles.photoActions}>
                  <a
                    href="https://forms.gle/VnmFnsi5VtuJhxhw9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.uploadFormBtn}
                  >
                    <FontAwesomeIcon icon={faUpload} /> Open Photo Upload Form <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.externalIcon} />
                  </a>

                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="uploadedPhoto"
                      checked={formData.uploadedPhoto}
                      onChange={(e) => setFormData((prev) => ({ ...prev, uploadedPhoto: e.target.checked }))}
                      className={styles.checkbox}
                    />
                    <span>I have submitted / will submit my picture via the form</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Registering...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} /> Register Profile
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

