
# 📚 AI Learning Management System (LMS)

A full-stack **Learning Management System** with AI-powered tutor, built using:

* ⚛️ Frontend: Next.js + Tailwind/JS
* ☕ Backend: Spring Boot
* 🛢 Database: MySQL
* 🤖 AI: Custom AI chat integration

---

# 🚀 Features

## 👨‍🎓 Student

* Register & Login (JWT Authentication)
* Create Profile
* Browse Courses
* Enroll in Courses
* Track Progress 📊
* View Lessons
* AI Tutor Chat 🤖

## 👨‍🏫 Teacher

* Create Profile
* Create & Manage Courses
* View Enrolled Students
* Track Student Progress

## 🛠 Admin

* View All Users
* Manage Students & Teachers
* View Courses

---

# 🧠 AI Feature

* Ask questions about:

  * Courses
  * Lessons
  * Concepts (e.g. REST API)
* Smart responses using AI service

---

# 🏗 Tech Stack

## Frontend

* Next.js (App Router)
* Axios
* GSAP (animations)
* CSS Modules / Tailwind

## Backend

* Spring Boot
* Spring Security (JWT)
* JPA / Hibernate

## Database

* MySQL

---

# 🔐 Authentication Flow

```text
Login → JWT Cookie → /auth/me → Role Check
   ├── STUDENT → profile-exists → dashboard/add-profile
   ├── TEACHER → profile-exists → dashboard/add-profile
   └── ADMIN → dashboard
```

---

# 📂 Project Structure

## Backend (Spring Boot)

```
com.example.demo
│
├── Controller
├── Service
├── Repo
├── Entity
├── Security
└── Ai
```

## Frontend (Next.js)

```
app/
├── student/
├── teacher/
├── admin/
├── login/
└── components/
```

---

# ⚙️ Setup Instructions

## 1️⃣ Backend Setup

```bash
cd backend
mvn spring-boot:run
```

### application.properties

```
spring.datasource.url=://localhost:3306/lms
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 API Endpoints (Sample)

## Auth

* `POST /auth/login`
* `GET /auth/me`

## Student

* `GET /student/profile`
* `GET /student/courses`
* `POST /student/courses/{id}/enroll`
* `GET /student/my-courses`

## Teacher

* `GET /teacher/course`
* `GET /teacher/course/{id}/enrollments`

## Admin

* `GET /admin/get/user`
* `GET /admin/get/teacher`
* `GET /admin/get/students`
* `GET /admin/get/course`

---

# 📊 Progress Logic

```text
Progress = (Completed Lessons / Total Lessons) * 100
```

* Auto updates on lesson completion
* Marks course as COMPLETED at 100%

---

# 🛡 Security

* JWT Authentication (Cookie-based)
* Role-based authorization:

  * STUDENT
  * TEACHER
  * ADMIN

---

# 🧪 Future Improvements

* 📊 Dashboard analytics
* 📜 Certificate generation
* 💬 Real-time chat
* 📱 Mobile responsive UI
* 🔔 Notifications system

---

# 🙌 Author

**Amlesh Kumar**

---

# ⭐ If you like this project

Give it a ⭐ on GitHub!

---


