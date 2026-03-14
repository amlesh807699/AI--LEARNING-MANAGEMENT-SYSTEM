"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const EnrollmentsPage = () => {
  const { courseId } = useParams()
  const router = useRouter()

  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const titleRef = useRef(null)
  const tableRef = useRef(null)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/teacher/course/${courseId}/enrollments`,
          { credentials: "include" }
        )

        if (res.status === 403) {
          setError("❌ Unauthorized access")
          return
        }

        if (!res.ok) throw new Error("Failed to load enrollments")

        const data = await res.json()
        setEnrollments(data)
      } catch (err) {
        console.error(err)
        setError("❌ Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [courseId])

  // 🎬 GSAP animation
  useEffect(() => {
    if (!loading && !error) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.4 }
      )

      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          ease: "power3.out"
        }
      )
    }
  }, [loading, error])

  if (loading) return <p className={styles.loading}>Loading enrollments...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <h2 ref={titleRef} className={styles.title}>
        📋 Enrolled Students
      </h2>

      {enrollments.length === 0 ? (
        <p className={styles.empty}>No students enrolled yet.</p>
      ) : (
        <div ref={tableRef} className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Email</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Enrolled On</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enroll, index) => (
                <tr key={enroll.id}>
                  <td>{index + 1}</td>
                  <td>{enroll.student?.name}</td>
                  <td>{enroll.student?.user?.email}</td>
                  <td>{enroll.progress}%</td>
                  <td>
                    <span
                      className={
                        enroll.status === "COMPLETED"
                          ? styles.completed
                          : styles.active
                      }
                    >
                      {enroll.status}
                    </span>
                  </td>
                  <td>
                    {new Date(enroll.enrolledAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className={styles.backBtn} onClick={() => router.back()}>
        ← Back
      </button>
    </div>
  )
}

export default EnrollmentsPage
