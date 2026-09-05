# Scholars Today

> **GitHub Repository:** [https://github.com/asepjamaludinn/scholarstoday](https://github.com/asepjamaludinn/scholarstoday)  
> **Live Demo:** [https://scholarstoday.vercel.app/](https://scholarstoday.vercel.app/)

An educational web platform designed to help students and professionals identify the right learning path through an interactive placement test. The application guides users from initial registration through a dynamic quiz, automated scoring, and a personalized course recommendation delivered via WhatsApp consultation.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Build and Deployment](#build-and-deployment)
- [Performance Considerations](#performance-considerations)
- [AI Prompts](#ai-prompts)

## Overview

Scholars Today is a single-page application built to streamline the process of matching prospective students with an appropriate course level. Users land on an introductory page describing the platform and its programs, register through a validated form, complete a multiple-choice placement quiz, and receive an automatically calculated recommendation. The final result includes a generated WhatsApp link that initiates a consultation with an administrator, pre-filled with the user's score and program of interest.

## Key Features

- **Interactive Landing Page**: Introduces the platform, explains how the placement test works, and highlights available programs, including Web Development, Data Science, UI/UX Design, and Digital Marketing.
- **Validated Registration Form**: Real-time form validation powered by Zod, covering email format, character limits, and a custom regular expression for Indonesian WhatsApp phone numbers.
- **Dynamic and Persistent Quiz**: A multiple-choice assessment with automatic progress saving to `localStorage`. Custom hooks (`BeforeUnload` and `LeaveGuard`) prevent accidental loss of progress on page refresh or navigation away from the quiz.
- **Automated Score Calculation**: Computes the user's score on completion and maps the result to a recommended course tier (Beginner, Intermediate, or Advanced).
- **WhatsApp Integration**: Dynamically generates a WhatsApp checkout link containing the user's score, contact details, and recommended program, routed to the configured administrator number.

## Tech Stack

| Category          | Technology         |
| ----------------- | ------------------ |
| Framework         | React 19 with Vite |
| Language          | TypeScript         |
| Styling           | Tailwind CSS v4    |
| Routing           | React Router DOM   |
| Schema Validation | Zod                |
| Icons             | Iconify            |
| Testing           | Vitest             |

## Project Structure

The codebase follows a separation-of-concerns pattern to keep UI, business logic, and data access independent of one another:

```
src/
├── components/
│   └── ui/          Reusable presentational components (Button, TextField, Card, etc.)
├── hooks/            Business logic and state management (useQuiz, useResult, useRegistrationForm, etc.)
├── services/         Data access abstraction layer (localStorage API, WhatsApp link generator)
├── schemas/          Zod validation schemas
├── tests/            Unit tests for services and utility functions
├── pages/            Route-level page components
└── App.tsx           Application entry point and route configuration
```

This structure keeps components free of business logic, isolates data access behind a service layer, and centralizes validation rules for reuse across forms.

## Prerequisites

Before setting up the project, ensure the following are installed:

- Node.js version 18 or later
- npm version 9 or later (or an equivalent package manager such as pnpm or yarn)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/asepjamaludinn/scholarstoday
   cd scholarstoday
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables as described in the section below.

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` by default.

## Environment Variables

Create a `.env` file in the project root with the following variable:

```
VITE_ADMIN_WHATSAPP_NUMBER=6281234567890
```

Notes:

- The number must be provided in international format, starting with the country code `62`, without spaces, dashes, or a leading plus sign.
- This value is used to construct the WhatsApp consultation link generated on the results page.
- A `.env.example` file should be maintained alongside `.env` to document required variables without exposing real values.

## Available Scripts

| Command           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with hot module replacement.           |
| `npm run build`   | Builds an optimized, production-ready bundle in the `dist` directory.     |
| `npm run preview` | Serves the production build locally for verification prior to deployment. |
| `npm run test`    | Runs the unit test suite using Vitest.                                    |
| `npm run lint`    | Runs static analysis to catch code quality and style issues.              |

Adjust script names above to match the exact entries defined in `package.json` if they differ.

## Development Workflow

- Business logic should be implemented in custom hooks under `src/hooks/`, not inside UI components.
- Any interaction with external state (localStorage, generated links, or future API calls) should go through the `src/services/` layer to keep components decoupled from implementation details.
- All form input should be validated against a schema defined in `src/schemas/` using Zod before being processed or persisted.
- New UI elements intended for reuse should be added to `src/components/ui/` and kept free of business logic.

## Testing

Unit tests are written with Vitest and focus on isolating business logic and services from UI rendering concerns.

To run the full test suite:

```bash
npm run test
```

To run tests in watch mode during development:

```bash
npm run test -- --watch
```

New logic added to `src/services/` or `src/hooks/` should be accompanied by corresponding tests in `src/tests/`.

## Build and Deployment

To generate a production build:

```bash
npm run build
```

To verify the production build locally before deployment:

```bash
npm run preview
```

Important: Always evaluate performance metrics (for example, with Lighthouse) against the production build rather than the development server. The development server does not minify JavaScript or optimize assets, which produces significantly worse and non-representative performance results.

## Performance Considerations

To maintain a high performance score in production:

- Compress and resize all images before adding them to the repository. Serve images at the dimensions they are actually displayed, and prefer modern formats such as WebP or AVIF.
- Avoid committing unoptimized, high-resolution source images directly into public or asset directories.
- Where large media assets such as video are used above the fold, consider using a lightweight poster image first and deferring video loading until after initial render.
- Audit performance in an incognito browser window or a clean browser profile with no extensions enabled, since browser extensions can distort Lighthouse results.
- Periodically review bundle size and remove unused dependencies or code paths, particularly for larger libraries.

## AI Prompts

Proyek ini memanfaatkan _Generative AI_ untuk mempercepat pengembangan aset visual, struktur data, dan _copywriting_. Berikut adalah dokumentasi _prompt_ utama yang memberikan dampak besar selama proses pengembangan:

### 1. Supporting Video (Hero Section)

Generating a cinematic and inspirational video for the landing page while strictly preserving the original company logo.

**Prompt:**

> "Buatlah video yang sinematik dan inspiratif yang menampilkan sekelompok orang sedang belajar dengan penuh semangat serta terlibat dalam diskusi yang produktif. Tampilkan mereka saat bertukar ide, berkolaborasi, mencatat, menggunakan laptop, dan belajar bersama dengan ekspresi yang energik dan positif. Suasananya harus terasa kolaboratif, inspiratif, dan penuh antusiasme. Gunakan pergerakan kamera yang halus, pencahayaan alami, gerakan manusia yang realistis, serta komposisi sinematik yang profesional. Di akhir video, lakukan transisi yang halus menuju logo perusahaan menggunakan logo yang sama persis dengan gambar yang diunggah. Logo yang diunggah tidak boleh diubah sama sekali—jangan memodifikasi, mendesain ulang, mengubah warna, mendistorsi, memotong (crop), menambahkan elemen, ataupun mengubah bentuk, tipografi, proporsi, atau detailnya dengan cara apa pun. Tampilkan logo persis seperti aslinya, diposisikan tepat di tengah sebagai gambar penutup, hanya dengan animasi _fade-in_ atau _fade-out_ yang halus. Profesional, realistis, sinematik, berkualitas tinggi, rasio aspek 16:9."

### 2. Placement Test Dataset (questions.json)

Structuring technically accurate multiple-choice questions across 4 different learning programs.

**Prompt:**

> "Berperanlah sebagai instruktur IT dan Digital Marketing. Buatkan saya database soal _placement test_ dalam format array JSON. Buat masing-masing 15 soal pilihan ganda (A, B, C, D) untuk 4 program: Web Development, Data Science, UI/UX Design, dan Digital Marketing. Tingkat kesulitan soal harus bervariasi dari dasar hingga menengah. Format JSON harus memiliki properti: `id`, `program`, `question`, `options` (array of object berisi `key` dan `text`), serta `correctAnswer`."

### 3. Class Recommendation Logic (classRecommendations.json)

Generating learning roadmap levels based on the calculated score percentage of test takers.

**Prompt:**

> "Buatkan data array JSON untuk sistem rekomendasi kelas berdasarkan hasil nilai ujian. Program yang tersedia adalah Web Development, Data Science, UI/UX Design, dan Digital Marketing. Setiap program memiliki 3 level rekomendasi berdasarkan skor: Beginner (0-49%), Intermediate (50-79%), dan Advanced (80-100%). Masing-masing level harus memiliki judul kelas (`title`), deskripsi profil kemampuan siswa (`description`), dan 3 poin fokus pembelajaran (`focusAreas`)."

### 4. Legal & Copywriting (termsData.ts & UI Text)

Structuring the legal framework and professional, user-friendly interface text.

**Prompt:**

> "Tuliskan halaman Syarat dan Ketentuan (Terms & Conditions) untuk platform edukasi bernama 'Scholars Today'. Platform ini menyediakan kuis penempatan dan rekomendasi kelas. Teks harus ringkas, profesional, dan mencakup: Pengumpulan data pengguna (Nama, Email, WhatsApp) yang disimpan di local storage, Larangan manipulasi skor, dan Batasan Tanggung Jawab. Buat dalam format terstruktur dengan judul bagian dan poin-poin."
