# Arunashree Job Match Assistant v0.5.0

## What this version does
- Scans supported Naukri and LinkedIn job listing pages for visible job cards.
- Estimates relevance and checks salary, experience, remote signals and excluded terms.
- Saves scanned jobs and avoids adding the same canonical URL twice.
- Adds an eligible-job queue: open the next saved eligible job in a new tab.
- Keeps a tracker with statuses and CSV export.
- Keeps profile and tracker data in Chrome local storage.

## Important limitation
This release does **not** automatically submit job applications, does not run in the cloud, and does not send email notifications. The queue opens the job page only. Apply on the platform, then update the tracker status to `Applied` after submission is confirmed. Automated submission may be restricted by job platforms and must not bypass CAPTCHA, OTP, authentication, rate limits or access controls.

## Install/update
1. Extract this ZIP to a permanent folder.
2. Open `chrome://extensions`.
3. If updating the existing unpacked extension, replace the files in its existing folder with these files and click **Reload**. Do not load a second copy unless you intend to keep two separate extensions.
4. Refresh the Naukri or LinkedIn tab.
5. Open the extension, choose **Scan jobs on this listings page**, then **Save scanned jobs to tracker**.
6. Choose **Open next eligible job** to open the next queued result.

## Notes
- Job sites change their layouts, so selectors may need maintenance.
- The score is a heuristic, not an AI guarantee. Salary/experience wording and remote/hybrid contradictions should be reviewed.
- No passwords, session cookies, or authentication tokens are collected.
