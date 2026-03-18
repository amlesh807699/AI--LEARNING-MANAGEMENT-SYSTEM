
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

home page 
<img width="1901" height="910" alt="Screenshot 2026-03-14 164940" src="https://github.com/user-attachments/assets/705692ce-30fb-44e0-b0aa-553ab4aae48f" />
register
<img width="1916" height="906" alt="Screenshot 2026-03-18 234703" src="https://github.com/user-attachments/assets/4a3d2ecd-9f05-49a3-8db1-daab021dfd85" />
login
<img width="1916" height="909" alt="Screenshot 2026-03-18 234447" src="https://github.com/user-attachments/assets/4023889d-bf25-4e8f-ada6-786b2e5aed72" />
student dashboard
<img width="1918" height="907" alt="Screenshot 2026-03-14 171738" src="https://github.com/user-attachments/assets/e432cf79-4623-41dd-a5bd-41ff57f468cf" />
all course for student 
<img width="1914" height="886" alt="Screenshot 2026-03-14 171755" src="https://github.com/user-attachments/assets/4e3f988d-f771-4b45-848d-914413e4f70a" />

enrol etcc
<img width="947" height="475" alt="Screenshot 2026-03-18 235030" src="https://github.com/user-attachments/assets/e73c47d5-2a6f-4310-8e01-f729d634a799" />

enrooled courses
<img width="1911" height="693" alt="Screenshot 2026-03-18 235123" src="https://github.com/user-attachments/assets/4b00ef97-a8bc-4280-b8c1-ed4b74cf419a" />

course lesson 
<img width="954" height="706" alt="Screenshot 2026-03-18 235218" src="https://github.com/user-attachments/assets/50284ca6-bc92-4039-a09f-a2bba272bae4" />

one lesson 
<img width="955" height="670" alt="Screenshot 2026-03-18 235250" src="https://github.com/user-attachments/assets/0adf27f4-b04c-4526-aa85-d696e5bd6d7d" />

profile
<img width="1916" height="705" alt="Screenshot 2026-03-18 235320" src="https://github.com/user-attachments/assets/bf48b42b-0fc1-48bf-a5c5-aeace76ea2b9" />

course search
<img width="960" height="652" alt="Screenshot 2026-03-18 235405" src="https://github.com/user-attachments/assets/65c4748d-02ab-4d1d-ade0-316aecff09a7" />

out off limit(no frontend or backend error)
<img width="1894" height="581" alt="Screenshot 2026-03-18 235446" src="https://github.com/user-attachments/assets/7ae2c8d5-71f2-4ad2-9312-24e56ade24f8" />

# now teacher
dashboard
<img width="1889" height="809" alt="Screenshot 2026-03-18 235628" src="https://github.com/user-attachments/assets/198c4011-6040-4212-9533-61948080f910" />
add course
<img width="1914" height="785" alt="Screenshot 2026-03-18 235641" src="https://github.com/user-attachments/assets/565d7400-2b76-49f1-b023-92386f79f7e7" />
my course
<img width="1905" height="705" alt="Screenshot 2026-03-18 235655" src="https://github.com/user-attachments/assets/224d822c-97d6-4bb1-ab39-3366ba25eecc" />
enrolled students
<img width="1916" height="530" alt="Screenshot 2026-03-18 235732" src="https://github.com/user-attachments/assets/7883b543-6d72-4a03-9171-009bf3d260dc" />

add lesson of course
<img width="1911" height="781" alt="Screenshot 2026-03-18 235745" src="https://github.com/user-attachments/assets/82b77245-a970-489e-a9eb-0e2f6ecda17b" />

# now admin
dashboard
<img width="1909" height="762" alt="Screenshot 2026-03-19 000445" src="https://github.com/user-attachments/assets/60228b2a-ec0f-4459-998b-0cf3f0afb422" />
user list
<img width="1713" height="727" alt="Screenshot 2026-03-19 000457" src="https://github.com/user-attachments/assets/870d8084-d679-4bd8-a8a4-3bf2ae221a32" />

same like there is list of teacher and students and course


