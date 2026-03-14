"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./page.module.css"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/admin/get/course", {
      withCredentials: true
    })
    .then(res => setCourses(res.data))
  }, [])

return (
  <div className={styles.container}>
    <h2 className={styles.heading}>📚 Courses</h2>

    <div className={styles.courseList}>
      {courses.map(c => (
        <div key={c.id} className={styles.courseCard}>
          <h3 className={styles.title}>{c.title}</h3>
          <p className={styles.description}>{c.description}</p>
          <p className={styles.info}><b>Category:</b> {c.category}</p>
          <p className={`${styles.info} ${styles.price}`}><b>Price:</b> ₹{c.price}</p>
          <p className={styles.info}><b>Teacher:</b> {c.teacher?.name}</p>
        </div>
      ))}
    </div>
  </div>
)
}