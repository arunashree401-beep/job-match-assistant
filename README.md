# Arunashree Job Match Assistant v0.5.0

A Chrome browser extension designed to support job searching, job matching, and application tracking, with an A-Checker concept for annotation quality assistance.

## Features

### 1. Job Match Assistant
- Scans supported Naukri and LinkedIn job listing pages for visible job cards.
- Estimates job relevance using salary, experience, remote-work signals, and excluded terms.
- Saves scanned jobs and avoids duplicate entries using canonical URLs.
- Maintains an eligible-job queue to open saved job listings in new tabs.
- Tracks job application statuses and supports CSV export.
- Stores profile and tracker data in Chrome local storage.

### 2. A-Checker — CVAT Annotation Quality Assistance
Designed to support annotation quality review by identifying potential issues against Standard Operating Procedures (SOPs).

Intended quality-checking goals:
- Flag potential annotation inconsistencies.
- Support review of object labels, bounding boxes, and occlusion-related cases.
- Help SMEs review annotation quality more consistently.
- Reduce repetitive manual checking and avoidable rework.

**Note:** The availability of these checks depends on the actual A-Checker implementation and CVAT integration included in the project.

## Technology Stack
- JavaScript
- HTML
- CSS
- Chrome Extension Manifest
- Browser DOM interaction
- SOP-based annotation quality review concepts

## Installation
1. Download or extract the project files into a permanent folder.
2. Open `chrome://extensions` in Google Chrome.
3. Enable Developer mode.
4. Select **Load unpacked** and choose the folder containing `manifest.json`.
5. Open a supported Naukri or LinkedIn job-listing page and refresh it.
6. Use the extension to scan job listings, save jobs, and manage your tracker.

## Important Limitations
- The extension does not automatically submit job applications.
- It does not run in the cloud or send email notifications in this release.
- The eligible-job queue opens a job listing; users must complete the application themselves and update the tracker.
- Job matching scores are heuristic estimates, not guarantees.
- Direct CVAT integration and automated SOP validation should only be claimed when implemented and tested.
- Do not bypass CAPTCHA, OTP, authentication, rate limits, or platform access controls.

## Project Structure
- `manifest.json` — extension configuration.
- `content.js` — content-script logic.
- `popup.html` — popup interface.
- `popup.js` — popup interactions.
- `popup.css` — popup styling.
- `README.md` — project documentation.

## Author
Arunashree S

## Version
0.5.0

