import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchStories, fetchItem } from '../api/hackerNewsAPI'
import style from '../styles/NewsList.module.css'

interface Story {
  id: number
  title: string
  by: string
  score: number
  url: string
}

const NewsList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [page, setPage] = useState(0)
  const [storyType, setStoryType] = useState<
    'topstories' | 'newstories' | 'beststories'
  >('topstories')

  const STORIES_PER_PAGE = 15
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const loadStories = useCallback(async () => {
    const storyIds = await fetchStories(storyType)
    const startIndex = page * STORIES_PER_PAGE
    const endIndex = startIndex + STORIES_PER_PAGE
    const currentStoryIds = storyIds.slice(startIndex, endIndex)
    const storiesData = await Promise.all(currentStoryIds.map(fetchItem))
    setStories((prevStories) => [...prevStories, ...storiesData])
  }, [page, storyType])

  useEffect(() => {
    loadStories()

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const intervalId = setInterval(() => {
      setPage(0)
      setStories([])
      loadStories()
    }, 30000)

    timerRef.current = intervalId

    return () => clearInterval(intervalId)
  }, [loadStories])

  const handleStoryTypeChange = (
    type: 'topstories' | 'newstories' | 'beststories'
  ) => {
    setStoryType(type)
    setPage(0)
    setStories([])
  }

  const handleManualRefresh = () => {
    setPage(0)
    setStories([])
    loadStories()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    const intervalId = setInterval(() => {
      setPage(0)
      setStories([])
      loadStories()
    }, 30000)
    timerRef.current = intervalId
  }

  return (
    <div>
      <h1 className={style.title}>Новости</h1>
      <div className={style.buttons}>
        <button onClick={() => handleStoryTypeChange('topstories')}>
          Топ Новостей
        </button>
        <button onClick={() => handleStoryTypeChange('newstories')}>
          Новые Новости
        </button>
        <button onClick={() => handleStoryTypeChange('beststories')}>
          Лучшие Новости
        </button>
      </div>
      <button className={style.refreshButton} onClick={handleManualRefresh}>
        Обновить новости
      </button>

      <Link to="/favorites">Избранное</Link>

      <div>
        {stories.map((story) => (
          <div className={style.container} key={story.id}>
            <div className={style.newsItem}>
              <h2>
                <Link to={`/news/${story.id}`}>{story.title}</Link>
              </h2>
              <p>Score: {story.score}</p>
              <p>By: {story.by}</p>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                Читать...
              </a>
            </div>
          </div>
        ))}
      </div>
      {stories.length > 0 && (
        <button
          className={style.loadButton}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Загрузить еще
        </button>
      )}
    </div>
  )
}

export default NewsList
