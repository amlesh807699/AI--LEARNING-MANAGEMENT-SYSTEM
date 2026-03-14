"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const [query, setQuery] = useState("")
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const headerRef = useRef(null)
  const inputRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5 }
    )

    gsap.fromTo(
      inputRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, delay: 0.2 }
    )
  }, [])

  const searchCourses = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:8080/student/search?query=${query}`,
        { credentials: "include" }
      )

      if (!res.ok) throw new Error("Search failed")

      const data = await res.json()
      setCourses(data)

      // 🎬 animate cards
      setTimeout(() => {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out"
          }
        )
      }, 100)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 ref={headerRef} className={styles.heading}>
        🔍 Search Courses
      </h2>

      {/* SEARCH BAR */}
      <div ref={inputRef} className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by course or teacher name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />

        <button onClick={searchCourses} className={styles.button}>
          Search
        </button>
      </div>

      {/* STATUS */}
      {loading && <p className={styles.status}>Searching...</p>}
      {!loading && courses.length === 0 && query && (
        <p className={styles.status}>No courses found</p>
      )}

      {/* RESULTS */}
      <div className={styles.grid}>
        {courses.map((course, index) => (
          <div
            key={course.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={styles.card}
          >
            <h3>{course.title}</h3>
            <p className={styles.desc}>{course.description}</p>

            <div className={styles.meta}>
              <span>👨‍🏫 {course.teacher?.name}</span>
              <span>₹ {course.price}</span>
            </div>

            <button
              className={styles.viewBtn}
              onClick={() =>
                router.push(`/student/all-course/${course.id}`)
              }
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
