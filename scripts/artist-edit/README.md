# Artist change requests

Profile Settings contains Make Story, Make Post (1080 × 1080 PNG) and Edit Details.
Edit Details opens `/artists/edit?id=USKG1` with the artist's published details.
Name, country, bio, Instagram and three other links can be requested for update.
A private contact email is required. Empty optional links mean remove those links.
No replacement photo means keep the published photo. Identity and public profiles
are never changed automatically.

## Google setup

1. Create a new private Sheet named **USK Galle Artist Change Requests** and a
   private Drive folder named **USK Galle Change Request Photos**.
2. Create a separate Apps Script project and paste this directory's `Code.gs`.
3. In Project Settings → Script properties, set `SPREADSHEET_ID` and
   `PHOTO_FOLDER_ID` to the IDs only (not full URLs). Set `ALLOWED_ORIGINS` to
   `https://uskgalle.github.io,http://localhost:3000`.
4. Run `checkEditSetup` in the editor, authorize it, and confirm both access checks.
5. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone**.
   Copy the `/exec` URL. Use a new deployment, not the registration deployment.
6. Add the following to the root `.env.local`, keeping the existing registration
   URL unchanged, then restart `npm run dev`:

   ```env
   NEXT_PUBLIC_ARTIST_EDIT_URL=https://script.google.com/macros/s/YOUR_EDIT_DEPLOYMENT_ID/exec
   ```

7. Add `NEXT_PUBLIC_ARTIST_EDIT_URL` with the same URL under GitHub repository
   Settings → Secrets and variables → Actions → Variables. The workflow already
   passes it to the build. Push the source changes and deploy the website.

The receiver creates a **Change Requests** tab and headings automatically. It uses
the same acknowledgement protocol as registration, with separate endpoint, Sheet
and photo folder. References prevent duplicate rows on retries.

## Test and review

Without an edit endpoint, development on localhost offers a clearly labelled test
mode that sends and saves nothing. Production disables submission until configured.
Check an unknown/missing ID, prefilled fields, clearing links, a text-only request,
a replacement photo and a retry. A successful real request should show a success
screen and one Pending row in the new Sheet; only replacements create photos.

Treat artist ID, slug and requested details as unverified user input. Before
publishing, match the ID to the current roster and verify the request through the
artist's previously known contact or social account, not only the newly supplied
email. Apply approved changes through the existing artist data/profile workflow,
then mark the row Approved or Rejected. Keep emails and request records private;
delete temporary personal data/photos according to your retention policy.

For later code updates, use Deploy → Manage deployments → Edit → New version.

Run receiver checks with `node scripts/artist-edit/receiver.test.cjs`.
