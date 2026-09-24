# Online Lecture Scheduling System

A full-stack MERN application for managing courses, instructors, lecture schedules, and course images through ImageKit.io.

## Features

- **Role-based portals:** Admins manage courses, instructors, and lecture assignments. Instructors view their assigned schedules.
- **Schedule clash prevention:** An instructor cannot be assigned to more than one lecture on the same date.
- **ImageKit uploads:** Course banner images are uploaded directly from the frontend using a secure backend authentication endpoint.
- **MongoDB persistence:** Courses, instructors, and schedules are stored with Mongoose models.
- **Responsive frontend:** React, Vite, and Tailwind CSS power the user interface.

## Tech Stack

**Frontend:** React, Vite, Axios, Tailwind CSS, `imagekitio-react`

**Backend:** Node.js, Express, MongoDB, Mongoose, ImageKit, CORS, dotenv

## Project Structure

```text
.
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controllers/
│       ├── models/
│       └── routes/
└── Frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── components/
        ├── context/
        ├── Pages/
        └── services/
```

## Prerequisites

- Node.js 18 or newer
- A MongoDB Atlas connection string
- An ImageKit.io account

## Setup

### 1. Configure the backend

From the repository root:

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Start the API server:

```bash
node server.js
```

The backend runs at `http://localhost:3000`.

### 2. Configure the frontend

Open a second terminal from the repository root:

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Start the development server:

```bash
npm run dev
```

The frontend is available at `http://localhost:5173`.

## Frontend Commands

Run these commands from `Frontend/`:

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## API Endpoints

All API routes are served from `http://localhost:3000`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check that the backend is running |
| `GET` | `/api/admin/imagekit-auth` | Get secure ImageKit upload parameters |
| `GET` | `/api/admin/courses` | List all courses |
| `POST` | `/api/admin/courses` | Create a course |
| `GET` | `/api/admin/instructors` | List all instructors |
| `POST` | `/api/admin/instructors` | Create an instructor |
| `POST` | `/api/admin/schedules` | Assign a lecture |
| `GET` | `/api/instructor/schedules/:instructorId` | Get an instructor's schedule |

## Notes

- Keep `IMAGEKIT_PRIVATE_KEY` in the backend environment only. Do not expose it in the frontend `.env` file.
- Vite exposes frontend environment variables only when their names begin with `VITE_`.
- Run the backend before using course creation or ImageKit uploads in the frontend.
