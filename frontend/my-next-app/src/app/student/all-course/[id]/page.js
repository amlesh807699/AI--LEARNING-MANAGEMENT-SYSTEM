"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import gsap from "gsap"
import styles from "./page.module.css"

export default function Page() {
  const { id } = useParams()
  const router = useRouter()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [error, setError] = useState("")

  const containerRef = useRef(null)
  const metaRef = useRef([])
  const buttonRef = useRef(null)

  

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/student/courses/${id}`,
          { credentials: "include" }
        )

        if (!res.ok) throw new Error("Failed to fetch course")

        const data = await res.json()
        setCourse(data)
      } catch (err) {
        console.error(err)
        setError("Course not found")
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

 

  useEffect(() => {
    if (!loading && course) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }
      )

      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 }
      )

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3 }
      )
    }
  }, [loading, course])

 

  const enroll = async () => {
    try {
      setEnrolling(true)
      setError("")

      await axios.post(
        `http://localhost:8080/student/courses/${id}/enroll`,
        {},
        { withCredentials: true }
      )

      alert("Enrolled successfully!")
      router.push(`/student/courses/${id}/lessons`)

    } catch (err) {
      if (err.response?.status === 409) {
        setError(err.response.data) 
      } else {
        setError("Enrollment failed")
      }
    } finally {
      setEnrolling(false)
    }
  }

  

  if (loading) return <p className={styles.loading}>Loading course...</p>
  if (!course) return <p>{error}</p>

  const isEnrolled = course.enrolled === true

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} ref={containerRef}>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.desc}>{course.description}</p>

        <div className={styles.meta}>
          <span ref={(el) => (metaRef.current[0] = el)}>
             {course.category}
          </span>
          <span ref={(el) => (metaRef.current[1] = el)}>
             ₹{course.price}
          </span>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          ref={buttonRef}
          onClick={enroll}
          disabled={enrolling || isEnrolled}
          className={`${styles.button} ${
            isEnrolled ? styles.disabled : ""
          }`}
        >
          {isEnrolled
            ? " Already Enrolled"
            : enrolling
            ? "Enrolling..."
            : "Enroll & View Lessons →"}
        </button>
      </div>
    </div>
  )
}
