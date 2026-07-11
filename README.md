# 🎓 AcademiaPulse

![Status](https://img.shields.io/badge/Status-In_Design_Phase-orange)
![Version](https://img.shields.io/badge/Version-v1.0.0--draft-blue)
![License](https://img.shields.io/badge/License-MIT-green)

🚧 **Note: This project is currently in the UI/UX design and system specification phase. Active backend and frontend development will be starting soon!** 🚧

**AcademiaPulse** is a planned full-stack student dashboard and academic management system designed to track semester performance, manage tasks, and generate AI-driven study plans[cite: 1]. 

🎨 **Active UI/UX Design:** [View the official Figma Design here](https://www.figma.com/design/fnxzKFYFmEMhMjpbyYe8yX/AcademiaPulse-%E2%80%94-App-Design?node-id=0-1&t=hlwEVeJrMxxmlrCd-1)

---

## ✨ Planned Features 

Based on the current `AcademiaPulse-Spec-Fixes.md` system specifications, the application will include:

*   **Secure Authentication:** Will feature strict HTTP-only cookie JWT storage, refresh token rotation, password reset flows, and email verification[cite: 1].
*   **Advanced Grade Tracking:** Will calculate real-time GPA and CGPA using precise credit-weight formulas[cite: 1]. It will manage customizable component weights (Quizzes, Midsems, Endsems, etc.) strictly normalized to 100%[cite: 1].
*   **🤖 AI Study Planner:** Will integrate with Google's Gemini API to generate personalized study plans based on weak subjects, syllabus progress, and available time, utilizing database-level TTL caching to manage API limits[cite: 1].
*   **Task & Backlog Management:** Will track assignments with automated background cron jobs for overdue "backlog" flagging and 24-hour due-date reminders[cite: 1].
*   **Attendance Forecaster:** Smart attendance tracking to instantly calculate the exact number of future classes needed to hit the 75% threshold, or how many can be safely skipped[cite: 1].
*   **Export Data:** Users will be able to generate and download semester or overall performance reports in PDF (via `pdfkit`) or CSV formats[cite: 1].

---

## 🛠️ Proposed Tech Stack

*   **Backend:** Node.js, Express.js[cite: 1]
*   **Database:** MongoDB (Mongoose)[cite: 1]
*   **Security:** JWT, bcrypt, Rate Limiting[cite: 1]
*   **Integrations:** Google Gemini API (AI Planner)[cite: 1]
*   **Utilities:** `node-cron` (Task scheduling), `pdfkit` (Report generation)[cite: 1]

---

## 📂 Core Database Models (Draft)

AcademiaPulse will use a highly optimized NoSQL schema[cite: 1]:
*   `User`: To manage identity, verified emails, and secure password storage[cite: 1].
*   `Semester`: To track academic terms linked to the user[cite: 1].
*   `Subject`: A top-level collection tracking credits, precise attendance metrics, component weights, and syllabus progress[cite: 1].
*   `RefreshToken`: To secure session persistence[cite: 1].
*   `StudyPlanCache`: TTL-indexed caching for Gemini API responses[cite: 1].

---

## 🚀 API Reference (v1 - Proposed)

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/refresh` | Issues a new access token[cite: 1] |
| `POST` | `/api/v1/auth/forgot-password` | Initiates password reset[cite: 1] |
| `POST` | `/api/v1/auth/reset-password` | Completes password reset[cite: 1] |
| `GET` | `/api/v1/auth/verify-email/:token`| Verifies user email[cite: 1] |

### Tasks
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/tasks?type=&completed=&backlog=&page=&limit=` | Fetches paginated tasks[cite: 1] |

### Export
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/export/semester/:semId?format=pdf\|csv` | Exports semester data[cite: 1] |

---

## 💻 Installation & Setup (Coming Soon)

*Instructions for cloning, installing dependencies, configuring `.env` variables, and starting the local development server will be added here once the initial codebase is committed.*

---

## 👨‍💻 Author

**Adarsh Deshmukh** 
*Backend Development & System Architecture*
