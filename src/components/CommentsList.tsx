import React from 'react'
import Comment from './Comment'
import styles from '../styles/CommentsList.module.css'

interface CommentsListProps {
  ids: number[]
}

const CommentsList: React.FC<CommentsListProps> = ({ ids }) => {
  return (
    <div className={styles.commentsList}>
      {ids.map((id) => (
        <Comment key={id} id={id} />
      ))}
    </div>
  )
}

export default CommentsList
