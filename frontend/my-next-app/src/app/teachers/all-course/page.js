"use client"

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const [courses, setCourses] = useState([])
  const router = useRouter()
  const listRef = useRef(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  
  useEffect(() => {
    if (courses.length > 0) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }
      )
    }
  }, [courses])

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/teacher/courses",
        { withCredentials: true }
      )
      setCourses(res.data)
    } catch (err) {
      console.error(err)
      alert(" Failed to load courses")
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚 My Courses</h1>

      {courses.length === 0 && (
        <p className={styles.empty}>No courses found</p>
      )}

      <div ref={listRef} className={styles.courseList}>
        {courses.map(course => (
          <div key={course.id} className={styles.card}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <div className={styles.actions}>
              <button
                className={styles.primaryBtn}
                onClick={() =>
                  router.push(
                    `/teachers/all-course/${course.id}/lessons`
                  )
                }
              >
                 View Lessons
              </button>

              <button
                className={styles.successBtn}
                onClick={() =>
                  router.push(
                    `/teachers/all-course/${course.id}/add-lesson`
                  )
                }
              >
                 Add Lesson
              </button>

              <button
                className={styles.outlineBtn}
                onClick={() =>
                  router.push(`/teachers/enrolled/${course.id}`)
                }
              >
                👥 Enrollments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
