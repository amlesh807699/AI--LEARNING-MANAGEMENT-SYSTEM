"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./page.module.css"

export default function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/admin/get/user", {
      withCredentials: true
    })
    .then(res => setUsers(res.data))
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>👤 All Users</h2>

      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className={u.verified ? styles.verified : styles.notVerified}>
                  {u.verified ? "yes" : "no"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}