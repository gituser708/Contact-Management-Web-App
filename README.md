# Contact Management Web App (MERN + Vite + TailwindCSS)

A full-stack **Contact Management Web Application** built using the **MERN Stack** with **Vite**, **TailwindCSS**, **Formik**, and **Yup**.  
Users can **create, view, and delete contacts** with full form validation and a modern UI.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Formik
- Yup
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 🌐 Live Demo

**App URL:** https://contact-form-web-app.onrender.com

---

## 📌 Features

- Add new contacts  
- View saved contacts  
- Delete contacts  
- Form validation using **Formik + Yup**  
- Responsive UI using **TailwindCSS**  
- REST API with Express + MongoDB  

---

## 📂 Project Structure
│
├── backend # Node + Express backend
|- frontend # React + Vite frontend
└── README.md

---

## 🛠 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/gituser708/Contact-Management-Web-App
cd Contact-Management-Web-App


cd server
npm install

MONGO_URI=your_mongodb_connection_string
PORT=5000

npm run dev
cd client

npm install
npm run dev

http://localhost:5173

📡 API Endpoints
Get All Contacts
GET /api/contacts

Add Contact
POST /api/contact-form

Delete Contact
DELETE /api/delete/:id

📝 Form Validation (Formik + Yup)

Required fields

Email validation

Inline error messages

💅 Styling

Built fully with TailwindCSS for responsive layouts and clean UI.

🧪 Scripts

Frontend
npm run dev
npm run build

Backend
npm run dev
npm install
npm start

🔐 Environment Variables

Required in backend .env:

📦 Deployment

Recommended:

Frontend: Render

Backend: Render

DB: MongoDB Atlas