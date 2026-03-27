# MeetLog – Professional Interaction Tracker

MeetLog is a full-stack web application that helps users record, manage, and review professional interactions such as conferences, seminars, meetings, and networking events.

The project now includes authentication, backend API, and cloud database support.

---

# 🚀 Features

## Frontend
- Add new interaction details
- Dynamic dashboard rendering
- Real-time search and filtering
- Delete interactions
- View full interaction details
- Dynamic statistics (Total, Monthly, Pending)
- Responsive dark-themed UI

## Backend
- User Authentication (Signup & Login)
- Secure password hashing using bcrypt
- JWT-based authentication
- REST API architecture
- Cloud database integration

---

# 🧱 Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Backend
- Node.js
- Express.js

## Database
- Neon PostgreSQL

## Authentication
- JWT (jsonwebtoken)
- bcrypt

---

# 🏗️ Project Structure
MeetLog/  
│
├── frontend/  
│ ├── index.html  
│ ├── dashboard.html   
│ ├── add.html   
│ ├── view.html   
│
│ ├── css/   
│ │ ├── variables.css   
│ │ ├── base.css    
│ │ ├── layout.css   
│ │ └── components.css   
│
│ ├── js/   
│ │ ├── add.js   
│ │ ├── dashboard.js   
│ │ └── view.js   
│
├── backend/   
│ ├── server.js   
│ ├── db.js   
│ └── routes/   
│ └── auth.js   
│
├── .env   
├── package.json   
└── README.md   


---

# 🔄 Application Flow

### User Flow

1. User signs up or logs in
2. User adds new interaction
3. Data sent to backend API
4. Backend stores data in Neon database
5. Dashboard dynamically renders interactions
6. Stats update automatically

---

# 📡 API Endpoints

## Authentication

### Signup
POST /api/auth/signup

### Login
POST /api/auth/login


---

# 🗄️ Database

This project uses Neon PostgreSQL

## Tables

### Users Table

- id
- name
- email
- password
- created_at

### Interactions Table

- id
- user_id
- name
- company
- event
- notes
- created_at

---

# ⚙️ Installation

Clone repository

---

# 🗄️ Database

This project uses Neon PostgreSQL

## Tables

### Users Table

- id
- name
- email
- password
- created_at

### Interactions Table

- id
- user_id
- name
- company
- event
- notes
- created_at

---

# ⚙️ Installation

Clone repository
git clone https://github.com/Tanmay-262/meetlog.git

Install dependencies
npm install
Run Backend
npm run dev
Server runs on


---

# 🎯 Purpose

This project demonstrates:

- Full-stack development
- REST API development
- Authentication & authorization
- Database integration
- Clean UI architecture
- Scalable application structure

---

# 🔮 Future Improvements

- Edit interaction feature
- Follow-up reminders
- Analytics dashboard
- Voice input (Speech-to-text)
- Deployment
- Multi-user collaboration

---

# 🚀 Current Status

- Frontend UI Complete
- Backend Setup Complete
- Signup API Working
- Login API In Progress

---

# 👨‍💻 Developed By

Tanmay Jain  
B.Tech CSE

---

# 📄 License

MIT License
