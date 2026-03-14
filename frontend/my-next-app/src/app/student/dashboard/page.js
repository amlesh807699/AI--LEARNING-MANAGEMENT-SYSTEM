"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const router = useRouter()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  const headerRef = useRef(null)
  const cardsRef = useRef([])
  const actionsRef = useRef([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/student/profile", {
          credentials: "include"
        })

        if (!res.ok) throw new Error("Not logged in")

        const data = await res.json()
        setStudent(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  
  useEffect(() => {
    if (!loading && student) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.2
        }
      )

      gsap.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          delay: 0.5
        }
      )
    }
  }, [loading, student])

  if (loading) return <p className={styles.loading}>Loading dashboard...</p>

  return (
    <div className={styles.container}>
      {/* Header */}
      <div ref={headerRef}>
        <h2 className={styles.welcome}>👋 Welcome, {student?.name}</h2>
        <p className={styles.subText}>
          🎓 {student?.education} • 💡 {student?.interests}
        </p>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div
          className={styles.card}
          ref={(el) => (cardsRef.current[0] = el)}
        >
          <h3>{student?.totalEnrolledCourses ?? 0}</h3>
          <p>Enrolled Courses</p>
        </div>

        <div
          className={styles.card}
          ref={(el) => (cardsRef.current[1] = el)}
        >
          <h3>{student?.completedCourses ?? 0}</h3>
          <p>Completed Courses</p>
        </div>
      </div>

      
      <div className={styles.actions}>
        <button
          ref={(el) => (actionsRef.current[0] = el)}
          className={styles.button}
          onClick={() => router.push("/student/all-course")}
        >
          📚 Browse Courses
        </button>

        <button
          ref={(el) => (actionsRef.current[1] = el)}
          className={styles.button}
          onClick={() => router.push("/student/my-courses")}
        >
          🎓 My Courses
        </button>

        <button
          ref={(el) => (actionsRef.current[2] = el)}
          className={styles.button}
          onClick={() => router.push("/student/profile")}
        >
          🙍 My Profile
        </button>
      </div>
    </div>
  )
}

export default Page
