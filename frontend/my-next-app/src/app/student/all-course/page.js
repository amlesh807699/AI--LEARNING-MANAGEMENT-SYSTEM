"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const cardsRef = useRef([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:8080/student/courses", {
          method: "GET",
          credentials: "include"
        })

        if (!res.ok) throw new Error("Failed to fetch courses")

        const data = await res.json()
        setCourses(data)
      } catch (err) {
        console.error("Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // 🎬 GSAP animation
  useEffect(() => {
    if (!loading && courses.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out"
        }
      )
    }
  }, [loading, courses])

  if (loading) return <p className={styles.loading}>Loading courses...</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚 All Courses</h1>

      {courses.length === 0 ? (
        <p>No courses available</p>
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
                <span>📂 {course.category}</span>
                <span>💰 ₹{course.price}</span>
              </div>

              <button
                className={styles.button}
                onClick={() =>
                  router.push(`/student/all-course/${course.id}`)
                }
              >
                View Course →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
