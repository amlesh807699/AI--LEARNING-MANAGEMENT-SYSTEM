"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const router = useRouter()

  const heroRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3
      }
    )
  }, [])

  return (
    <div className={styles.container}>
      {/* HERO */}
      <section ref={heroRef} className={styles.hero}>
        <h1>Learnify</h1>
        <p>
          One powerful platform for Students, Teachers, and Admins to learn,
          teach, and manage education at scale.
        </p>

        <div className={styles.heroBtns}>
          <button onClick={() => router.push("/register")}>
            Get Started
          </button>
          <button
            className={styles.outline}
            onClick={() => router.push("/student/all-course")}
          >
            Browse Courses
          </button>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className={styles.section}>
        <h2>Who Is This Platform For?</h2>

        <div className={styles.cardGrid}>
          {roles.map((role, i) => (
            <div
              key={role.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className={styles.card}
            >
              <h3>{role.icon} {role.title}</h3>
              <p>{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${styles.section} ${styles.features}`}>
        <h2>Platform Features</h2>

        <ul className={styles.featureList}>
          <li>📚 Multi-course & category system</li>
          <li>🎥 Secure video-based learning</li>
          <li>📝 Assignments, quizzes & lessons</li>
          <li>📊 Progress & performance tracking</li>
          <li>🔐 Role-based secure authentication</li>
          <li>🤖 AI-ready architecture (recommendations & tutor)</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 Learnify. Built for the AI-first education era.</p>
      </footer>
    </div>
  )
}

const roles = [
  {
    title: "Students",
    icon: "🎓",
    desc:
      "Learn new skills, enroll in courses, watch lessons, complete quizzes, and track progress."
  },
  {
    title: "Teachers",
    icon: "👩‍🏫",
    desc:
      "Create and manage courses, upload lessons, assign tasks, and monitor student performance."
  }
]

export default Page
