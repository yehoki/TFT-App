import React from 'react'
import styles from "../page.module.css"
type Props = {}

function Header({}: Props) {
  return (
    <header>
      <h1 className={styles.header}>TFT App</h1>
    </header>
  )
}

export default Header