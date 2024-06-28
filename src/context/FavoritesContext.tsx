// src/contexts/FavoritesContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react'

interface FavoritesContextProps {
  favorites: any[]
  addFavorite: (newsItem: any) => void
  removeFavorite: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
})

interface FavoritesProviderProps {
  children: ReactNode
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (newsItem: any) => {
    setFavorites((prevFavorites) => [...prevFavorites, newsItem])
  }

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    )
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesContext, FavoritesProvider }
