"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./page.module.css"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/admin/get/teacher", {
      withCredentials: true
    })
    .then(res => setTeachers(res.data))
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>👨‍🏫 Teachers</h2>

      <div className={styles.teacherList}>
        {teachers.map(t => (
          <div key={t.id} className={styles.teacherCard}>
            <p className={`${styles.info} ${styles.name}`}><b>Name:</b> {t.name}</p>
            <p className={styles.info}><b>Email:</b> {t.user?.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}