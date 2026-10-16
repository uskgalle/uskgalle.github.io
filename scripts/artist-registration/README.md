# Artist registration setup

The /register page collects details, one required photo, an optional Instagram handle (with or without @) and three other optional URLs. The handle is converted to an Instagram profile URL before submission. It stays on GitHub Pages. No artist sign-in or automatic public profile changes occur.

## Connect your Google account

1. Create a **private** Google Sheet for submissions and a **private** Drive folder for photos. Do not use folders with public or inherited broad sharing.
2. Create a project at https://script.google.com and paste `Code.gs` into its editor.
3. In Project Settings > Script properties, add:
   - `SPREADSHEET_ID`: the ID between `/d/` and `/edit` in the Sheet URL.
   - `PHOTO_FOLDER_ID`: the ID after `/folders/` in the Drive folder URL.
   - `ALLOWED_ORIGINS`: `https://uskgalle.github.io` (add `,http://localhost:3000` for local testing, or your exact custom domain origin).
4. Deploy > New deployment > Web app. Execute as **Me**, access **Anyone**. Authorize access using your Google account. If your account/organisation disallows anonymous web apps, this deployment will not work without changing that policy or using another receiver.
5. Copy the deployment URL ending in `/exec`.
6. In the GitHub repository Settings > Secrets and variables > Actions > Variables, create `NEXT_PUBLIC_ARTIST_REGISTRATION_URL` with that URL. The workflow passes it to the build. The URL is public by design; it is not an API secret.
7. Rebuild/deploy the website. For local development, put the same value in `.env.local`, then restart `npm run dev`:

   ```env
   NEXT_PUBLIC_ARTIST_REGISTRATION_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

The old details-only endpoint is deliberately not reused. Until the new receiver is configured, the page shows a setup notice and disables submission instead of losing photos or reporting false success.

## Verify before opening registration

For a local UI test, run `npm run dev` and visit `http://localhost:3000/register` without setting the receiver URL. The button reads **Test Registration**. Fill the required fields, upload a photo and submit to preview the test confirmation. Refresh the page to start another test. This mode processes the photo locally but sends and saves nothing; it does not verify Google Drive or Sheets. It is available only in development on a loopback hostname when no receiver URL is configured. Production still requires the receiver above.

- In a signed-out/incognito browser, submit all required fields with a photo and all four optional URLs. Check one row in `Registrations`, a private photo link that opens for the owner, and success on the site without navigation.
- Repeat with optional links blank. Check JPG, PNG and WebP uploads; oversized/unsupported files should be rejected. Photos are converted to JPEG, at most 1200 pixels on the longest side.
- Simulate a missing folder or missing Sheet permission: success must not appear. Restore configuration and retry on the same page: there should be only one row for its reference.
- Test on mobile and with tracking/privacy protections enabled. Apps Script returns an embedded HTML acknowledgement via postMessage, avoiding opaque no-cors fetch success. Some browser restrictions may block the embedded service; in that case the page times out and offers a retry, never claims success.
- The form freezes its submitted contents during retries so an ambiguous network result cannot silently replace an earlier submission. Keep the page open until confirmation.

## Reviewing and deleting temporary data

Review each Pending row, download its photo, and create/update the profile through your normal GitHub process. Mark the row Processed. After publishing, delete the temporary Drive photo and personal submission data according to your retention policy (for example, after 30 days); empty Drive trash if you need to recover storage. Do not delete reference rows while retries are still likely, because their IDs provide duplicate protection.

Only manually reviewed profile data belongs in the public repository; email addresses and raw submissions stay private. This change does not add a separate profile-change request form or change the profile generator's link schema.

The receiver serializes writes, checks required fields, links and JPEG bytes, and neutralizes spreadsheet formulas. It uses a honeypot and a basic 100-per-day cap. The origin allowlist controls acknowledgement destinations; it is **not authentication** and cannot prevent direct scripted requests. For sustained abuse, disable the deployment and add stronger spam protection. Free Apps Script quotas and your Google Drive storage allowance apply.

A submission is confirmed only after both file creation and Sheet flush. Google Drive and Sheets do not provide a shared transaction: a rare failure can leave a temporary orphan photo. Reconcile these by reference and delete unlinked files. Retry IDs avoid duplicate rows after a lost acknowledgement. No email confirmation is sent automatically.

When updating Code.gs later, update the deployed version under Deploy > Manage deployments.
