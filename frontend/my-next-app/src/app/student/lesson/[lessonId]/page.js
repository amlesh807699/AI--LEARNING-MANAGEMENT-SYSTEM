"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const { lessonId } = useParams()

  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  const titleRef = useRef(null)
  const descRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/student/lessons/${lessonId}`,
          { credentials: "include" }
        )

        if (!res.ok) throw new Error("Failed to load lesson")

        const data = await res.json()
        setLesson(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) fetchLesson()
  }, [lessonId])

  // 🎬 GSAP animations
  useEffect(() => {
    if (!loading && lesson) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2 }
      )

      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.35,
            ease: "power3.out"
          }
        )
      }
    }
  }, [loading, lesson])

  if (loading) return <p className={styles.loading}>Loading lesson...</p>
  if (!lesson) return <p className={styles.error}>Lesson not found</p>

  return (
    <div className={styles.container}>
      <h1 ref={titleRef} className={styles.title}>
        📘 {lesson.title}
      </h1>

      <p ref={descRef} className={styles.description}>
        {lesson.description}
      </p>

      {lesson.videoUrl && (
        <div ref={videoRef} className={styles.videoWrapper}>
          <video
            src={lesson.videoUrl}
            controls
            className={styles.video}
          />
        </div>
      )}
    </div>
  )
}

export default Page
