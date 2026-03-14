"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import "./navbar.css"

const Navbar = () => {
  const router = useRouter()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/me", {
        credentials: "include"
      })

      if (!res.ok) throw new Error("Not authenticated")

      const data = await res.json()
      setRole(data.role)
      localStorage.setItem("role", data.role)
    } catch (err) {
      setRole(null)
      localStorage.clear()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
    window.addEventListener("authChange", loadUser)
    return () => window.removeEventListener("authChange", loadUser)
  }, [])

  const logout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include"
      })
    } catch (err) {
      console.error("Logout error", err)
    }

    localStorage.clear()
    setRole(null)
    router.push("/login")
    router.refresh()
  }

  if (loading) return null

  return (
    <nav className="navbar">
      
     
      <Link href="/" className="logo">
       <Image
  src="https://img.freepik.com/premium-vector/lms-logo-lms-letter-lms-letter-logo-design-initials-lms-logo-linked-with-circle-uppercase-monogram-logo-lms-typography-technology-business-real-estate-brand_229120-66009.jpg"
  alt="LMS Logo"
  width={36}
  height={36}
  priority
/>
<span>LMS</span>

      </Link>

      
      {role === "STUDENT" && (
        <>
          <Link href="/student/dashboard">Dashboard</Link>
          <Link href="/student/all-course">All Courses</Link>
          <Link href="/student/enrolled-course">My Courses</Link>
          <Link href="/student/profile">Profile</Link>
          <Link href="/student/seachcourse">Search</Link>
          <Link href="/student/ai">AI Tutor</Link>
        </>
      )}

    
      {role === "TEACHER" && (
        <>
          <Link href="/teachers/dashboard">Dashboard</Link>
          <Link href="/teachers/add-course">Add Course</Link>
          <Link href="/teachers/all-course">My Courses</Link>
        </>
      )}

      
      {role === "ADMIN" && (
        <Link href="/admin/dashboard">Admin Panel</Link>
      )}

      
      <div className="navbar-right">
        {!role ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
