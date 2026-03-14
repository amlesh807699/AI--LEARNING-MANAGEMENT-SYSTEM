"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams.get("courseId")

  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  const headingRef = useRef(null)
  const lessonRefs = useRef([])

  useEffect(() => {
    if (!courseId) return

    const fetchLessons = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/student/courses/${courseId}/lessons`,
          { credentials: "include" }
        )

        if (!res.ok) throw new Error("Failed to fetch lessons")

        const data = await res.json()
        setLessons(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [courseId])

  
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      gsap.fromTo(
        lessonRefs.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out"
        }
      )
    }
  }, [loading])

  if (!courseId) return <p className={styles.error}>Course not selected</p>
  if (loading) return <p className={styles.loading}>Loading lessons...</p>

  return (
    <div className={styles.container}>
      <h1 ref={headingRef} className={styles.heading}>
       Course Lessons
      </h1>

      {lessons.length === 0 ? (
        <p className={styles.empty}>No lessons available</p>
      ) : (
        <div className={styles.list}>
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={styles.lesson}
              ref={(el) => (lessonRefs.current[index] = el)}
            >
              <div className={styles.left}>
                <span className={styles.index}>{index + 1}</span>
                <h3 className={styles.title}>{lesson.title}</h3>
              </div>

              <button
                className={styles.button}
                onClick={() =>
                  router.push(`/student/lesson/${lesson.id}`)
                }
              >
                Open →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
