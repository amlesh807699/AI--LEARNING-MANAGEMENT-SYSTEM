"use client"

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const { courseid } = useParams()
  const [lessons, setLessons] = useState([])
  const cardsRef = useRef([])

  useEffect(() => {
    if (courseid) fetchLessons()
  }, [courseid])

  useEffect(() => {
    if (lessons.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out"
        }
      )
    }
  }, [lessons])

  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/teacher/course/${courseid}/lessons`,
        { withCredentials: true }
      )
      setLessons(res.data)
    } catch (err) {
      alert("❌ Failed to load lessons")
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>📘 Course Lessons</h1>
        <p>Structured learning content for your students</p>
      </div>

      {lessons.length === 0 && (
        <p className={styles.empty}>No lessons found</p>
      )}

      <div className={styles.grid}>
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={styles.card}
          >
            <span className={styles.index}>
              Lesson {index + 1}
            </span>

            <h3>{lesson.title}</h3>

            <p className={styles.content}>
              {lesson.content}
            </p>

            {lesson.videoUrl && (
              <div className={styles.videoWrapper}>
                <video
                  src={lesson.videoUrl}
                  controls
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
