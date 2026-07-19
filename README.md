# 🎓 AcademiaPulse

![Status](https://img.shields.io/badge/Status-In_Development-brightgreen)
![Version](https://img.shields.io/badge/Version-v1.0.0--dev-blue)
![License](https://img.shields.io/badge/License-MIT-green)

🚧 **Note: This project is in active development. Core architecture and system design are finalized, and backend/frontend implementation is currently underway.** 🚧

**AcademiaPulse** is a full-stack student dashboard and academic management system designed to track semester performance, manage tasks, and generate AI-driven study plans.

🎨 **UI/UX Design:** [View the official Figma Design here](https://www.figma.com/design/fnxzKFYFmEMhMjpbyYe8yX/AcademiaPulse-%E2%80%94-App-Design?node-id=0-1&t=hlwEVeJrMxxmlrCd-1)

---

## ✨ Features (In Progress)

Based on the `AcademiaPulse-Spec-Fixes.md` system specifications, the application is being built to include:

*   **Secure Authentication:** Strict HTTP-only cookie JWT storage, refresh token rotation, password reset flows, and email verification.
*   **Advanced Grade Tracking:** Real-time GPA and CGPA calculation using precise credit-weight formulas, with customizable component weights (Quizzes, Midsems, Endsems, etc.) normalized to 100%.
*   **🤖 AI Study Planner:** Integration with Google's Gemini API to generate personalized study plans based on weak subjects, syllabus progress, and available time, with database-level TTL caching to manage API limits.
*   **Task & Backlog Management:** Assignment tracking with automated background cron jobs for overdue "backlog" flagging and 24-hour due-date reminders.
*   **Attendance Forecaster:** Smart attendance tracking to calculate the exact number of future classes needed to hit the 75% threshold, or how many can be safely skipped.
*   **Export Data:** Generate and download semester or overall performance reports in PDF (via `pdfkit`) or CSV formats.

---

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Mongoose)
*   **Security:** JWT, bcrypt, Rate Limiting
*   **Integrations:** Google Gemini API (AI Planner)
*   **Utilities:** `node-cron` (Task scheduling), `pdfkit` (Report generation)

---

## 📂 Core Database Models

AcademiaPulse uses an optimized NoSQL schema:

*   `User`: Manages identity, verified emails, and secure password storage.
*   `Semester`: Tracks academic terms linked to the user.
*   `Subject`: Top-level collection tracking credits, attendance metrics, component weights, and syllabus progress.
*   `RefreshToken`: Secures session persistence.
*   `StudyPlanCache`: TTL-indexed caching for Gemini API responses.

---

## 🚀 API Reference (v1)

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/refresh` | Issues a new access token |
| `POST` | `/api/v1/auth/forgot-password` | Initiates password reset |
| `POST` | `/api/v1/auth/reset-password` | Completes password reset |
| `GET` | `/api/v1/auth/verify-email/:token`| Verifies user email |

### Tasks
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/tasks?type=&completed=&backlog=&page=&limit=` | Fetches paginated tasks |

### Export
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/export/semester/:semId?format=pdf\|csv` | Exports semester data |

---

## 💻 Installation & Setup

*Setup instructions (cloning, dependencies, `.env` configuration, local dev server) will be added as the codebase stabilizes.*

---

## 👨‍💻 Author

**Adarsh Deshmukh**
*Backend Development & System Architecture*
