# Artwork submissions setup

1. Create a private Sheet named USK Galle Artwork Submissions and a private Drive folder named USK Galle Submitted Artworks.
2. Create a separate Apps Script project and paste Code.gs from this folder.
3. Set Script properties: SPREADSHEET_ID (ID only), PHOTO_FOLDER_ID (folder ID only), ALLOWED_ORIGINS (`https://uskgalle.github.io,http://localhost:3000`).
4. Run checkArtworkSetup and authorize access. Confirm both access checks succeed.
5. Deploy a new Web app, execute as Me, access Anyone. Copy its /exec URL.
6. Set NEXT_PUBLIC_ARTWORK_SUBMISSION_URL in .env.local and restart npm run dev. Set the same GitHub Actions repository variable and redeploy for the live site.
7. Submit a test artwork. Confirm the success screen, one row in the automatically created Artwork Submissions tab, and one original image in Drive. Retry on the same page after a timeout to preserve duplicate protection.

The form lists registered artists. The receiver checks the ID format only, not roster membership or ownership; verify attribution during manual review. Artwork files stay private until reviewed and published through the existing artwork workflow. No automatic public changes occur. A rare Sheet failure after upload can leave an orphan file: reconcile by reference before deleting it. The 100-per-day cap limits basic abuse, but the public receiver is not authenticated.

JPG, PNG and WebP originals up to 10 MB are preserved without resizing. Empty descriptions are allowed. When updating code, deploy a new version through Manage deployments. Keep temporary private records only as long as needed for review.
