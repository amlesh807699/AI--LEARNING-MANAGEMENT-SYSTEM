"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import styles from "./page.module.css"

const Page = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const headerRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/student/profile", {
          method: "GET",
          credentials: "include"
        })

        if (!res.ok) throw new Error("Failed to fetch profile")

        const data = await res.json()
        setProfile(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  
  useEffect(() => {
    if (!loading && profile) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power3.out"
        }
      )
    }
  }, [loading, profile])

  if (loading) return <p className={styles.loading}>Loading profile...</p>
  if (!profile) return <p className={styles.error}>No profile found</p>

  return (
    <div className={styles.container}>
      <h2 ref={headerRef} className={styles.heading}>
        Student Profile
      </h2>

      <div ref={cardRef} className={styles.card}>
        <ProfileRow label="Name" value={profile.name} />
        <ProfileRow label="Education" value={profile.education} />
        <ProfileRow label="Interests" value={profile.interests} />

        <div className={styles.stats}>
          <StatBox label="Enrolled Courses" value={profile.totalEnrolledCourses ?? 0} />
          <StatBox label="Completed Courses" value={profile.completedCourses ?? 0} />
        </div>
      </div>
    </div>
  )
}

const ProfileRow = ({ label, value }) => (
  <div className={styles.row}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
)

const StatBox = ({ label, value }) => (
  <div className={styles.stat}>
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
)

export default Page
