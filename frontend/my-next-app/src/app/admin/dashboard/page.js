"use client"

import { useRouter } from "next/navigation"
import styles from "./page.module.css"

export default function AdminDashboard() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1>🛠 Admin Dashboard</h1>

      <div className={styles.grid}>
        <button onClick={() => router.push("/admin/users")}>
          👤 Users
        </button>

        <button onClick={() => router.push("/admin/teachers")}>
          👨‍🏫 Teachers
        </button>

        <button onClick={() => router.push("/admin/students")}>
          🎓 Students
        </button>

        <button onClick={() => router.push("/admin/courses")}>
          📚 Courses
        </button>
      </div>
    </div>
  )
}
