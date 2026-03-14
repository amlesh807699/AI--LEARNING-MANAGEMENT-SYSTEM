"use client"

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const { courseid } = useParams()
  const router = useRouter()

  const containerRef = useRef(null)

  const [lesson, setLesson] = useState({
    title: "",
    content: ""
  })
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power4.out"
      }
    )
  }, [])

  const addLesson = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append(
        "lesson",
        new Blob([JSON.stringify(lesson)], {
          type: "application/json"
        })
      )

      if (video) {
        formData.append("video", video)
      }

      await axios.post(
        `http://localhost:8080/teacher/course/${courseid}/lesson`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      )

      alert("✅ Lesson added successfully")
      router.push(`/teachers/all-course/${courseid}/lessons`)

    } catch (err) {
      alert(err.response?.data || "❌ Failed to add lesson")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div ref={containerRef} className={styles.card}>
        <h1>➕ Add New Lesson</h1>
        <p>Create engaging content for your students</p>

        <form onSubmit={addLesson} className={styles.form}>

          <div className={styles.field}>
            <label>Lesson Title</label>
            <input
              type="text"
              value={lesson.title}
              onChange={e =>
                setLesson({ ...lesson, title: e.target.value })
              }
              placeholder="Enter lesson title"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Lesson Content</label>
            <textarea
              rows={5}
              value={lesson.content}
              onChange={e =>
                setLesson({ ...lesson, content: e.target.value })
              }
              placeholder="Explain the lesson in detail"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Lesson Video (optional)</label>
            <input
              type="file"
              accept="video/*"
              onChange={e => setVideo(e.target.files[0])}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Lesson"}
            </button>

            <button
              type="button"
              className={styles.cancel}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Page
