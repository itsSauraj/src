# Training Management Platform - Frontend

A comprehensive frontend application for managing trainees, courses, and assessments. The platform facilitates effective communication and collaboration among trainees, mentors, and administrators.

[![Demo](https://img.shields.io/badge/Demo-Render-blue)](https://abra-front-end.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://rect.dev)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)](https://git-scm.com/downloads)

## Live Demo
Visit [https://abra-front-end.onrender.com](https://abra-front-end.onrender.com)

## Tech Stack

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCDN](https://ui.shadcn.com/) (Primary UI Component Library)
- [NextUI v2](https://nextui.org/) (Additional Components)
- [Tailwind Variants](https://tailwind-variants.org)
- [Yup](https://www.npmjs.com/package/yup) & [React Hook Form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/docs/intro)
- ESLint for type checking and code quality
- Docker and Docker Compose

## Prerequisites

- VSCode or any code editor
- NodeJS >= v18.18 (Recommended: v22.12.0)
- Git >= 2.43.0
- Modern web browser
- Docker (optional)
- Backend API ([core repository](https://github.com/itssaurabh/core.git))

## Installation

1. **Clone the repositories**

   Backend:
   ```bash
   git clone https://github.com/itssaurabh/core.git
   ```

   Frontend:
   ```bash
   git clone https://github.com/itssauraj/src.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.sample .env
   # Update the values according to your system
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Building for Production

### Manual Build

1. Create `.env.production` file (can copy from `.env` for local testing)

2. Create production build
   ```bash
   npm run build
   ```

3. Start production server
   ```bash
   npm run start
   ```

### Docker Build

Build image:
```bash
docker build -t abra-fe .
```

Run container:
```bash
docker run -d -p 3000:3000 abra-fe
```

### Docker Compose

```bash
docker compose up --build
```

## Features

### For Trainees
- Course Management/Assessment
  - View assigned collections with details
  - Access course details
  - Track learning progress
- Performance Tracking
  - Daily and cumulative time tracking
  - Course completion monitoring
- Examination
  - View scheduled exams
  - Access exam details at scheduled time
- Notifications for upcoming exams

### For Administrators
- Course Management
  - Add, import, view, and delete courses
  - Create and manage course collections
  - Bulk import courses from folder structures
- Trainee Management
  - Add trainees and generate credentials
  - Assign tasks, courses, and mentors
  - View performance reports
- Exam Management
  - Schedule exams
  - Assign mentors
  - Send notifications
- Analytics
  - Detailed performance reports
  - Course completion tracking
- Notification System
  - Course start/completion alerts
  - Email notifications

### For Mentors
*This panel is currently under development*

## Accessing the Application

Visit [http://localhost:3000](http://localhost:3000) after starting either the development or production server.

## License

Licensed under the MIT license