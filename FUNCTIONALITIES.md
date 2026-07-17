# AcademiaPulse — Corrected Functionality Specification (v2)

This is a revision of the original spec. Every section below either (a) fixes a
concrete flaw in the original, or (b) is unchanged and kept for completeness.
Fixed items are marked **[FIXED]** with a one-line note on what was wrong.

---

## 1. User Authentication

- User Registration (Signup)
  - Fields: Name, Email, Password, Target CGPA (optional, default 8.0)
  - Email validation, normalization (`lowercase: true, trim: true`) and uniqueness
  - **[FIXED] Email verification required** before login is allowed (original had no verification step, so unowned/typo'd emails could register indefinitely).
  - Password hashing: bcrypt, **minimum 12 salt rounds**
  - Password policy: min 8 chars, at least 1 letter + 1 number (enforce server-side, not just UI)

- User Login
  - Email + password validation
  - **[FIXED] Account lockout**: after 5 failed attempts, lock for 15 minutes (original had no brute-force protection beyond generic "rate limiting").
  - JWT access token (short-lived, 15 min) **[FIXED] issued only as an HTTP-only, `Secure`, `SameSite=Strict` cookie** — never localStorage. Storing a JWT in localStorage is readable by any injected script (XSS); the original spec offered this as an interchangeable option, which is a security regression.
  - **[FIXED] Refresh token** (7-day expiry, rotated on every use, stored hashed in DB against the user so it can be revoked) issued as a separate HTTP-only cookie. Original spec mentioned "refresh mechanism" with no design.
  - **[FIXED] CSRF protection**: since auth now lives in cookies, add a `X-CSRF-Token` double-submit cookie check on all state-changing requests.

- User Logout
  - Clear both cookies server-side; delete stored refresh token hash from DB (so it can't be replayed).

- Protected Routes
  - Middleware verifies access token; if expired, frontend calls `/api/auth/refresh` once, then retries original request.

- Password Reset
  - Reset token: random 32-byte value, **hashed before storage**, 15-minute expiry, single-use
  - Rate-limited to 3 requests per email per hour (original didn't rate-limit this endpoint, which is a common abuse vector for email-bombing users)

---

## 2. Dashboard (Home Page)

Unchanged from original, with one addition:

- **[FIXED] Attendance threshold is now configurable** (see Section 6) rather than hardcoded at 75%, since different institutions set different minimums.

---

## 3. Semester & Marks Management

- Semester Creation
  - Fields: semester number, year
  - **[FIXED] `isCurrent: Boolean` flag**, exactly one semester per user may be `true` at a time (enforced in the controller: setting a new semester current unsets the previous one). Original spec required "view past semesters (read-only)" but had no field to distinguish current vs. past.

- Subject Management
  - Subject Name, Credits
  - Attendance: attended, totalClasses
  - **[FIXED] Marks Components now include a `weights` object stored per subject**, not just implied in prose:
    ```javascript
    weights: {
      quizzes: { type: Number, default: 10 },
      midsem:  { type: Number, default: 20 },
      endsem:  { type: Number, default: 40 }, // corrected from 30 → see note below
      labs:    { type: Number, default: 15 },
      assignments: { type: Number, default: 15 }
    }
    ```
    **[FIXED] Weight sum validation**: the original example (10+20+30+15+15 = 90%) never summed to 100%. Server-side validation now rejects any subject update where `sum(weights) !== 100`.

  - **[FIXED] Predicted grade is a deterministic calculation, not an LLM call.** Original spec said "calculated by backend AI," which is confusing given Section 4 uses actual AI (Gemini) for study planning — this made it ambiguous whether grade prediction also required a slow, non-deterministic API call for something that's pure arithmetic. Formula:
    ```
    weightedPercentage = Σ (markComponent × weight/100)   // over 5 components
    gradePoint = mapPercentageToGradePoint(weightedPercentage)  // table below
    ```
    Standard 10-point mapping (adjust to your institution):
    | Percentage | Grade | Points |
    |---|---|---|
    | ≥90 | O | 10 |
    | 80–89 | A+ | 9 |
    | 70–79 | A | 8 |
    | 60–69 | B+ | 7 |
    | 50–59 | B | 6 |
    | 45–49 | C | 5 |
    | 40–44 | P | 4 |
    | <40 | F | 0 |

  - **[FIXED] GPA/CGPA formula, explicitly stated** (missing entirely from original):
    ```
    semesterGPA = Σ(gradePoint × credits) / Σ(credits)   // over subjects in that semester
    CGPA = Σ(semesterGPA × semesterTotalCredits) / Σ(all credits across semesters)
    ```

- Marks Entry/Update
  - Same as original: real-time 0–max validation, triggers GPA + prediction recalc on save.

- Semester View
  - Same as original (tabular view, read-only past semesters via `isCurrent`, export option).

---

## 4. AI Study Planner (Gemini Integration)

- Input to AI: unchanged (weak subjects, pending syllabus topics, available time/day, pending tasks).

- API Call
  - POST to `/api/ai/generate-plan`
  - **[FIXED] Queue is now explicit and durable.** Original said "4-second delay between calls" without saying whether the queue is per-user or global, or how it survives a restart. Use **BullMQ + Redis** (or equivalent persistent job queue) so:
    - Rate limiting is enforced per Gemini API key, not per user (a global 4s spacing protects the shared quota).
    - Jobs survive a server restart/crash.
    - Multiple backend instances share one queue instead of each running its own in-memory timer.
  - **[FIXED] Caching now has an actual schema** (missing entirely from original Section 10):
    ```javascript
    // StudyPlanCache model
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      requestHash: { type: String, required: true, index: true }, // hash of (weakSubjects, syllabusTopics, timePerDay)
      plan: { type: Schema.Types.Mixed, required: true }, // structured day-by-day plan
      generatedAt: { type: Date, default: Date.now },
      expiresAt: { type: Date, index: { expires: 0 } } // MongoDB TTL index, auto-deletes after 24h
    }
    ```
  - **[FIXED] Cache key now includes a date component or pending-task snapshot.** Original cached on "same weak subjects, syllabus topics, time" only — but a 7-day plan generated on Monday and reused unchanged on Thursday is stale (3 days have already passed). Hash should also fold in the current date (or at minimum invalidate if any task due-date has passed since generation).
  - **[FIXED] Error handling required**: on Gemini timeout/failure/quota-exceeded, return a clear error to the frontend rather than leaving the request hanging; log failures for monitoring.
  - **[FIXED] Prompt-injection awareness**: task titles/descriptions are user-controlled text that gets embedded in the LLM prompt. Sanitize/delimit user content clearly in the prompt template so it can't override system instructions.

- Output: unchanged (day-by-day cards, regenerate option).

---

## 5. Task & Planner Management

- Task Creation / Views / Completion: unchanged from original.

- **[FIXED] Backlog flagging and reminders now have an explicit mechanism.** The original spec described the *behavior* ("automatic flagging as backlog," "alerts for tasks due in 24 hours") but never said what triggers it. Add:
  - A daily **cron job** (`node-cron` or `agenda`) that runs at a fixed time (e.g., 00:05 server time) to:
    - Flag any task with `dueDate < now && isCompleted === false` as `isBacklog: true`
    - Generate in-app alerts for tasks due within 24 hours
  - **[FIXED] Timezone handling**: store all dates in UTC; convert to the user's local timezone (stored on User profile, default from signup locale) only at render time.

---

## 6. Attendance Tracking

- Per-subject attendance: attended / totalClasses, percentage.
- **[FIXED] Threshold is configurable**, stored on the User profile (`attendanceThreshold`, default 75), not hardcoded — different colleges use 65/75/80%.
- **[FIXED] Explicit formula for "classes needed to reach threshold"** (original said "suggest number of classes" with no formula):
  ```
  Given: attended (a), totalClasses (t), threshold (T, as decimal), and
  futureClasses (f) = estimated remaining classes in the semester

  Classes needed to attend (n) to reach threshold by end of semester:
    n = ceil( (T × (t + f) - a) / 1 )   subject to 0 ≤ n ≤ f

  If n > f, flag as "cannot reach threshold this semester" instead of a
  suggested number (original spec had no handling for the mathematically
  impossible case).
  ```

---

## 7. Export Functionality

Unchanged from original (PDF/CSV for semester and overall performance), with one fix:
- **[FIXED]** Export format is passed as an explicit query param: `GET /api/export/semester/:semId?format=pdf`. Original left the format unspecified in the route.

---

## 8. User Profile & Settings

Unchanged, plus:
- **[FIXED] `attendanceThreshold` and `timezone` fields added** to support Sections 5–6 above.
- **[FIXED] Data retention policy stated**: on account deletion, data is purged within 30 days (needed for GDPR compliance, which the original listed as an unspecified checkbox).

---

## 9. Backend API Endpoints

### Authentication
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/verify-email` — **[FIXED, new]** confirms email before login is allowed
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/refresh` — **[FIXED, new]** rotates access token using refresh cookie
- POST `/api/v1/auth/logout`
- GET `/api/v1/auth/me`
- POST `/api/v1/auth/forgot-password`
- POST `/api/v1/auth/reset-password`

**[FIXED]** All routes now versioned under `/api/v1/` — original had no versioning strategy, which makes future breaking changes painful.

### Users
- GET `/api/v1/users/:id`
- PUT `/api/v1/users/:id`

### Semesters
- GET `/api/v1/semesters`
- POST `/api/v1/semesters`
- GET `/api/v1/semesters/:semId`
- PUT `/api/v1/semesters/:semId`
- DELETE `/api/v1/semesters/:semId`
- PUT `/api/v1/semesters/:semId/set-current` — **[FIXED, new]** toggles `isCurrent`

### Subjects (nested under semesters — consistent nesting throughout)
- GET `/api/v1/semesters/:semId/subjects`
- POST `/api/v1/semesters/:semId/subjects`
- PUT `/api/v1/semesters/:semId/subjects/:subId`
- DELETE `/api/v1/semesters/:semId/subjects/:subId`
- **[FIXED]** PUT `/api/v1/semesters/:semId/subjects/:subId/marks` — moved under the semester/subject path. Original route was `/api/subjects/:subId/marks`, inconsistent with the fact that subjects are embedded subdocuments of Semester and can't be looked up efficiently without the parent `semId`.

### Analysis & Prediction
- GET `/api/v1/semesters/:semId/analysis`

### AI Study Planner
- POST `/api/v1/ai/generate-plan`

### Tasks
- **[FIXED]** GET `/api/v1/tasks?type=&completed=&backlog=&page=1&limit=20` — pagination params added; original required pagination in non-functional requirements but never exposed it on the actual endpoint.
- POST `/api/v1/tasks`
- PUT `/api/v1/tasks/:taskId`
- DELETE `/api/v1/tasks/:taskId`

### Export
- GET `/api/v1/export/semester/:semId?format=pdf|csv`
- GET `/api/v1/export/overall?format=pdf|csv`

### **[FIXED] Standard error response shape** (missing from original)
```json
{
  "success": false,
  "error": { "code": "INVALID_MARKS", "message": "Marks must be between 0 and 100" }
}
```

---

## 10. Database Models (MongoDB)

### User
```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // bcrypt, 12 rounds
  isEmailVerified: { type: Boolean, default: false },        // [FIXED]
  failedLoginAttempts: { type: Number, default: 0 },          // [FIXED]
  lockUntil: { type: Date },                                  // [FIXED]
  targetCGPA: { type: Number, default: 8.0 },
  attendanceThreshold: { type: Number, default: 75 },         // [FIXED]
  timezone: { type: String, default: 'Asia/Kolkata' },        // [FIXED]
  refreshTokenHash: { type: String },                         // [FIXED]
}, { timestamps: true })  // [FIXED] adds createdAt + updatedAt
```

### Semester
```javascript
{
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  semesterNumber: { type: Number, required: true },
  year: { type: Number, required: true },
  isCurrent: { type: Boolean, default: false },   // [FIXED]
  currentGPA: { type: Number, default: 0 },
  subjects: [{
    subjectName: { type: String, required: true },
    credits: { type: Number, required: true },
    attendance: {
      attended: { type: Number, default: 0 },
      totalClasses: { type: Number, default: 0 }
    },
    weights: {                                     // [FIXED] — was missing entirely
      quizzes: { type: Number, default: 10 },
      midsem: { type: Number, default: 20 },
      endsem: { type: Number, default: 40 },
      labs: { type: Number, default: 15 },
      assignments: { type: Number, default: 15 }
    },
    marks: {
      quizzes: { type: Number, min: 0, max: 100, default: 0 },
      midsem: { type: Number, min: 0, max: 100, default: 0 },
      endsem: { type: Number, min: 0, max: 100, default: 0 },
      labs: { type: Number, min: 0, max: 100, default: 0 },
      assignments: { type: Number, min: 0, max: 100, default: 0 }
    },
    predictedGrade: { type: String, default: '' },
    predictedGradePoint: { type: Number, default: 0 },  // [FIXED] needed for GPA calc
    syllabusProgress: { type: Number, min: 0, max: 100, default: 0 }
  }]
}, { timestamps: true })
```

### Task
```javascript
{
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['assignment', 'exam', 'revision', 'daily'], required: true },
  dueDate: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  isBacklog: { type: Boolean, default: false },
  description: { type: String }
}, { timestamps: true })
```

### StudyPlanCache — **[FIXED, new model, entirely absent from original]**
```javascript
{
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  requestHash: { type: String, required: true, index: true },
  plan: { type: Schema.Types.Mixed, required: true },
  expiresAt: { type: Date, index: { expires: 0 } } // TTL: auto-deletes after 24h
}
```

**[FIXED] Indexes added**: `userId` on Semester/Task/StudyPlanCache, `requestHash` on StudyPlanCache — original spec mentioned indexing in the non-functional requirements but never applied it to any actual model.

---

## 11. Additional Features (Optional)

Unchanged from original.

---

## 12. Non-Functional Requirements

Unchanged, plus explicit items that were only implied before:
- **[FIXED] CORS**: whitelist the frontend origin explicitly; no wildcard `*` in production.
- **[FIXED] `helmet` middleware** for standard security headers.
- **[FIXED] Backend testing framework specified**: Jest + Supertest for API integration tests (original only named Jest/RTL for frontend, leaving backend testing tooling unspecified).

---

## 13. Development Milestones

1. Backend server, DB connection, basic auth (register/login/logout) **with email verification and refresh-token rotation from day one** — retrofitting auth security later is expensive.
2. Frontend auth pages wired to the above.
3. Semester + subject CRUD, **including the weights sub-schema**.
4. Marks entry, grade-point mapping table, GPA/CGPA calculation using the formulas in Section 3.
5. **StudyPlanCache model** + Gemini integration + BullMQ queue (build the cache model before wiring the AI call, not after).
6. Task management.
7. Attendance tracking + alerts, **including the configurable threshold and the shortfall formula**.
8. **[FIXED, new step]** Scheduled jobs: daily cron for backlog flagging + 24h reminders.
9. Export functionality (PDF/CSV).
10. Dashboard KPIs and graphs.
11. Profile and settings page.
12. **[FIXED, new step]** Security hardening pass: CORS, helmet, rate limiting on auth/AI/reset endpoints, CSRF tokens.
13. Testing, bug fixing, performance optimization.
14. Deployment prep (env vars, production build).