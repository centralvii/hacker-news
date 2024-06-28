import styles from '../styles/NewsItem.module.css'

import React from 'react'
import { Link } from 'react-router-dom'

interface NewsItemProps {
  id: number
  title: string
  score: number
  by: string
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, score, by }) => {
  return (
    <div className={styles.newsItems}>
      <Link to={`/news/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>Score: {score}</p>
      <p>By: {by}</p>
    </div>
  )
}

export default NewsItem
