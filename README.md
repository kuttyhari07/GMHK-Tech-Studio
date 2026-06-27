# GMHK Tech Studio MERN Website

Premium futuristic dark-themed agency website for **GMHK Tech Studio** with a Vite React frontend and Express/MongoDB backend.

## Project Structure

```text
client/
  src/
    components/
    hooks/
server/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
README.md
```

## Frontend

- React.js with Vite
- Dark futuristic agency design
- Glassmorphism cards
- Purple and orange glowing highlights
- Sticky responsive navbar
- CSS scroll reveal animations
- Connected contact form

## Backend

- Node.js and Express.js
- MongoDB with Mongoose
- Contact API: `POST /api/contact`
- JWT admin authentication
- Portfolio, pricing, testimonials, messages, and settings APIs
- Multer image uploads in `server/uploads`
- CORS enabled
- dotenv configuration
- Validation and error handling

## Contact API Fields

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "6380911912",
  "service": "Business Website",
  "message": "I need a modern website for my business."
}
```

## Setup

Install all dependencies from the root:

```bash
npm run install:all
```

Or install separately:

```bash
cd client
npm install

cd ../server
npm install
```

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gmhk-tech-studio
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@gmhktechstudio.in
ADMIN_PASSWORD=ChangeMe123!
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

## Run Development Servers

Start the backend:

```bash
npm run dev:server
```

Start the frontend in another terminal:

```bash
npm run dev:client
```

Direct folder commands also work:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

Contact submissions:

```text
POST http://localhost:5000/api/contact
```

## Admin Panel

Admin login:

```text
http://localhost:5173/admin/login
```

Local default credentials from `server/.env`:

```text
Email: admin@gmhktechstudio.in
Password: Admin@12345
```

Change these before production. The backend seeds the first admin into MongoDB when no admin exists.

Admin routes:

```text
/admin/dashboard
/admin/portfolio
/admin/pricing
/admin/testimonials
/admin/messages
/admin/settings
```

Main APIs:

```text
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PATCH  /api/auth/password

GET    /api/works
POST   /api/works
PUT    /api/works/:id
DELETE /api/works/:id

GET    /api/pricing
POST   /api/pricing
PUT    /api/pricing/:id
DELETE /api/pricing/:id

GET    /api/testimonials/approved
POST   /api/testimonials
GET    /api/testimonials
PUT    /api/testimonials/:id
DELETE /api/testimonials/:id
PATCH  /api/testimonials/:id/approve
PATCH  /api/testimonials/:id/reject

GET    /api/contact
PATCH  /api/contact/:id/read
DELETE /api/contact/:id

GET    /api/settings
PUT    /api/settings
GET    /api/dashboard
```
