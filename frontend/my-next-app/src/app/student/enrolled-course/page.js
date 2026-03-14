"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await fetch("http://localhost:8080/student/my-courses", {
          credentials: "include"
        })

        if (!res.ok) throw new Error("Failed to fetch enrolled courses")

        const data = await res.json()
        setCourses(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyCourses()
  }, [])

  
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.2,
          ease: "power3.out"
        }
      )
    }
  }, [loading])

  if (loading) return <p className={styles.loading}>Loading...</p>

  return (
    <div className={styles.container}>
      <h1 ref={headingRef} className={styles.heading}>
        🎓 My Enrolled Courses
      </h1>

      {courses.length === 0 ? (
        <p className={styles.empty}>You are not enrolled in any course</p>
      ) : (
        <div className={styles.grid}>
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={styles.card}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.desc}>{course.description}</p>

              <div className={styles.meta}>
                📂 {course.category}
              </div>

              <button
                className={styles.button}
                onClick={() =>
                  router.push(`/student/lesson?courseId=${course.id}`)
                }
              >
                View Lessons →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
