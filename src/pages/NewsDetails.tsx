import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchItem } from '../api/hackerNewsAPI'
import { FavoritesContext } from '../context/FavoritesContext'
import styles from '../styles/Comment.module.css'

interface Comment {
  id: number
  by: string
  text: string
  kids?: number[]
  time: number
  score?: number
  nestedComments?: Comment[]
}

const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addFavorite } = useContext(FavoritesContext)
  const [newsItem, setNewsItem] = useState<any>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCommentsRecursively = async (
      commentIds: number[]
    ): Promise<Comment[]> => {
      try {
        const commentsData = await Promise.all(commentIds.map(fetchItem))
        const commentsWithNested = await Promise.all(
          commentsData.map(async (comment) => {
            if (comment.kids) {
              const nestedComments = await fetchCommentsRecursively(
                comment.kids
              )
              return { ...comment, nestedComments }
            }
            return comment
          })
        )
        return commentsWithNested
      } catch (error) {
        console.error('Error fetching comments:', error)
        return []
      }
    }

    const fetchNews = async () => {
      try {
        const item = await fetchItem(Number(id))
        setNewsItem(item)
        if (item.kids) {
          const commentsData = await fetchCommentsRecursively(
            item.kids.slice(0, 30)
          )
          setComments(commentsData)
        }
      } catch (error) {
        console.error('Error fetching news item:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => {
      if (!comment) return null
      const date = new Date(comment.time * 1000).toLocaleString()
      return (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.commentContainer}>
            <p className={styles.commentAuthor}>{comment.by}</p>
            <p className={styles.commentMeta}>{date}</p>
            <p className={styles.commentScore}>
              Score: {comment.score !== undefined ? comment.score : 'N/A'}
            </p>
            <p
              className={styles.commentText}
              dangerouslySetInnerHTML={{ __html: comment.text }}
            ></p>
            {comment.nestedComments && comment.nestedComments.length > 0 && (
              <div className={styles.commentReplies}>
                {renderComments(comment.nestedComments)}
              </div>
            )}
          </div>
        </div>
      )
    })
  }

  if (loading) return <p>Loading...</p>
  if (!newsItem) return <p>News item not found.</p>

  return (
    <div>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>{newsItem.title}</h2>
      <p>By: {newsItem.by}</p>
      <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
        Читать...
      </a>
      <button onClick={() => addFavorite(newsItem)}>В Избранное</button>
      <div>
        <h3>Комментарии</h3>
        {renderComments(comments)}
      </div>
    </div>
  )
}

export default NewsDetails
