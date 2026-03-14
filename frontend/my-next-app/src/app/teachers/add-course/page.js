"use client"

import axios from "axios"
import { useState } from "react"
import styles from "./page.module.css"

const Page = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        "http://localhost:8080/teacher/course",
        course,
        { withCredentials: true }
      )

      alert(" Course created successfully")

      setCourse({
        title: "",
        description: "",
        category: "",
        price: ""
      })

    } catch (err) {
      console.error(err)
      alert(" Error creating course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📘 Create New Course</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Course Title"
          value={course.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category (e.g. Java, AI, Web)"
          value={course.category}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={course.price}
          onChange={handleChange}
          required
        />

        <button
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  )
}

export default Page
