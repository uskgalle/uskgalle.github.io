# Blog submissions setup

1. Create a private Google Sheet and a private Drive folder for blog drafts.
2. Create a separate Apps Script project and paste `Code.gs` from this folder.
3. Add Script properties: `SPREADSHEET_ID`, `DOCUMENT_FOLDER_ID` (IDs only), and `ALLOWED_ORIGINS` (`https://uskgalle.github.io,http://localhost:3000`).
4. Run `checkBlogSetup` and authorize Sheet/Drive access.
5. Deploy a Web app, execute as Me, access Anyone. Copy its `/exec` URL.
6. Set `NEXT_PUBLIC_BLOG_SUBMISSION_URL` in `.env.local` and restart development. Add the same GitHub Actions repository variable and redeploy for production.
7. Test a real artist submission with each method. Confirm a row in the automatically created Blog Submissions tab, and a private Drive file for uploads. On a timeout, retry on the same page to preserve the reference and prevent duplicate rows.

The profile tools menu links to `/blog/submit?id=USKG…`. Google Docs and other HTTPS links, PDF/DOC/DOCX/TXT/MD files up to 5 MB, and pasted text up to 30,000 characters are supported. Links are recorded, never fetched by the receiver. Authors must grant view access to their linked documents.

USKG0 is a preview only: its form does not transmit or save data, even when an endpoint is configured. The receiver also rejects USKG0.

Submissions are private drafts pending manual review, not automatic publication. The public receiver checks ID format, not identity or roster membership. Verify authorship, document safety, image permissions and link access during review. Uploaded document signatures are basic format checks, not malware scans. The receiver limits submissions to 100 per day. Retain private drafts only as long as needed. Ambiguous upload/write failures may leave a private orphan file; reconcile by submission reference before deleting it.

To publish an approved draft, create a blog data file using `src/app/data/blogs/template.js`, set `author` and `authorSlug` to the artist, and register it in `src/app/data/blogs/index.js`. It then appears on that artist's profile after the site is rebuilt.

Run receiver checks with `node scripts/blog-submission/receiver.test.cjs`.
