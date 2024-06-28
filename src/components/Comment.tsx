import React, { useEffect, useState } from 'react'
import { fetchItem } from '../api/hackerNewsAPI'
import styles from '../styles/Comment.module.css'

interface CommentProps {
  id: number
}

const Comment: React.FC<CommentProps> = ({ id }) => {
  const [comment, setComment] = useState<any>(null)

  useEffect(() => {
    fetchItem(id).then(setComment)
  }, [id])

  if (!comment) return <p>Loading...</p>

  return (
    <div className={styles.comment}>
      <p className={styles.commentBy}>{comment.by}</p>
      <p className={styles.commentText}>{comment.text}</p>
    </div>
  )
}

export default Comment
