"use client"

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const formRef = useRef(null)

  const [teacher, setTeacher] = useState({
    name: "",
    description: "",
    experience: "",
    education: ""
  })

  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
  }, [])

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value
    })
  }

  const submitTeacher = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        "http://localhost:8080/teacher/profile",
        teacher,
        { withCredentials: true }
      )

      alert("Teacher profile created successfully")

      setTeacher({
        name: "",
        description: "",
        experience: "",
        education: ""
      })
    } catch (err) {
      console.error(err)
      alert(err.response?.data || " Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div ref={formRef} className={styles.card}>
        <h2 className={styles.title}>Create Teacher Profile</h2>

        <form className={styles.form} onSubmit={submitTeacher}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={teacher.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Short bio (min 20 chars)"
            value={teacher.description}
            onChange={handleChange}
            minLength={20}
            required
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            value={teacher.experience}
            onChange={handleChange}
            min={0}
            max={50}
            required
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={teacher.education}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Saving..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
