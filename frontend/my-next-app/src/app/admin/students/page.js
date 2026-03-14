"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./page.module.css"

export default function StudentsPage() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/admin/get/students", {
      withCredentials: true
    })
    .then(res => setStudents(res.data))
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🎓 Students</h2>

      <div className={styles.studentList}>
        {students.map(s => (
          <div key={s.id} className={styles.studentCard}>
            <p className={`${styles.info} ${styles.name}`}><b>Name:</b> {s.name}</p>
            <p className={styles.info}><b>Email:</b> {s.user?.email}</p>
            <p className={styles.info}><b>Education:</b> {s.education}</p>
            <p className={styles.info}><b>Courses:</b> {s.totalEnrolledCourses}</p>
          </div>
        ))}
      </div>
    </div>
  )
}