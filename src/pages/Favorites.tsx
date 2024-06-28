import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext'
import styles from '../styles/Favorites.module.css'

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext)
  const navigate = useNavigate()

  if (favorites.length === 0) {
    return <p>No favorites yet.</p>
  }

  return (
    <div>
      <h2>Избранное</h2>
      {favorites.map((newsItem) => (
        <div key={newsItem.id} className={styles.newsItem}>
          <h3>{newsItem.title}</h3>
          <p>By: {newsItem.by}</p>
          <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
            Читать...
          </a>
          <button onClick={() => removeFavorite(newsItem.id)}>Удалить</button>
        </div>
      ))}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  )
}

export default Favorites
