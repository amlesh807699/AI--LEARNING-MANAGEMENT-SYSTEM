"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"

const Page = () => {
  const router = useRouter()

  const [student, setStudent] = useState({
    name: "",
    education: "",
    interests: ""
  })

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://localhost:8080/student/profile",
        student,
        { withCredentials: true }
      )

      alert("Student profile created successfully")
      router.push("/student/dashboard")
    } catch (err) {
      console.error(err)
      alert("Failed to create profile")
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎓 Create Student Profile</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          type="text"
          name="education"
          placeholder="Education"
          value={student.education}
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          type="text"
          name="interests"
          placeholder="Interests (Java, Spring, AI)"
          value={student.interests}
          onChange={handleChange}
          required
        />

        <button className={styles.button} type="submit">
          Create Profile
        </button>
      </form>
    </div>
  )
}

export default Page
