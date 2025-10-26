# 💼 Hyrify – Full-Stack Job Search & Recruitment Platform  
**Tech Stack:** React (Vite), Node.js, Express.js, MongoDB, JWT, Tailwind CSS, Clerk, Cloudinary, Sentry  

A full-stack **job portal platform** that bridges recruiters and job seekers through **role-based dashboards**, **smart filters**, and **real-time job management**.  
Designed with scalability, security, and performance in mind — integrating Clerk authentication, Cloudinary media storage, and Sentry monitoring for reliability.

---

## 🚀 Features

### 👥 Authentication & Authorization
- Secure sign-in and sign-up powered by **Clerk**.  
- **Role-based access** (Recruiter / Job Seeker) with protected routes using JWT.  

### 💻 Recruiter Dashboard
- Post, edit, and manage job listings.  
- View applicant details and track hiring progress.  
- Analytics for engagement and applicant insights.  

### 🧑‍💼 Job Seeker Dashboard
- Explore job listings using **advanced filters** (skills, experience, location).  
- Apply directly with resumes and cover letters.  
- Track application status in real time.  

### ⚙️ Performance & Security
- Optimized load times with **lazy loading** and **client-side caching**.  
- **Sentry monitoring** + **profiling** for performance tracking and error diagnostics.  
- File uploads handled via **Multer** and securely stored in **Cloudinary**.  

### 🧠 Additional Integrations
- **Rich text editor** (React-Quill) for dynamic job descriptions.  
- **Moment.js** for date and time formatting.  
- **Svix webhooks** for real-time notifications and updates.  

---

## 🏗️ Architecture Overview

```bash
Frontend:  React + Vite + TailwindCSS
Backend:   Node.js + Express.js
Database:  MongoDB (via Mongoose)
Auth:      Clerk + JWT
Storage:   Cloudinary
Error Tracking: Sentry
Deployment: Vercel
📦 Installation & Setup
Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/hyrify-jobportal.git
cd hyrify-jobportal
Client Setup
bash
Copy code
cd client
npm install
npm run dev
Server Setup
bash
Copy code
cd server
npm install
npm run dev
Environment Variables
Create a .env file in the server directory with:

bash
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
SENTRY_DSN=your_sentry_dsn
🌐 Deployment
Frontend: Vercel

Backend: Render / Railway

Database: MongoDB Atlas

Continuous monitoring with Sentry for crash reporting.

📊 Key Highlights & Achievements
🚀 Reduced page load times by 25% using lazy loading and caching.

🔍 Improved search relevance by 40% through optimized filtering logic.

🔒 Secured API with JWT and role-based authorization.

🧰 Implemented error tracing & performance profiling with Sentry.

🧑‍💻 Screenshots / Demo
(Add screenshots or a demo video link here – recruiters love visuals!)

🧭 Future Enhancements
💬 Real-time recruiter-candidate chat.

📱 PWA support for mobile access.

📊 Advanced analytics dashboards for recruiters.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss proposed modifications.

📫 Contact
Kartikay Shukla
📍 B.Tech, ECE @ IIIT Kota
💻 Portfolio | LinkedIn | GitHub

yaml
Copy code

---

Would you like me to make this version **GitHub-optimized** (with badges like _“Made with React”_, _“Deployed on Vercel”_, etc.) so it visually pops on your profile too?






