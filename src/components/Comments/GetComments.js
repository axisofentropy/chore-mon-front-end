import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import uuidv4 from 'uuid'
import logic from './logic'
import CommentCard from './CommentCard'

export default function GetComments({ groupId, taskId }) {
  const { firebase, user } = useContext(FirebaseContext)
  const [comments, setComments] = useState([])

  useEffect(() => {
    logic.fetch(user, groupId, setComments, taskId)
  }, [firebase.firestore, groupId, user, taskId])

  return (
    <>
      {comments.map(comment => (
        <div key={uuidv4()} class="comment-card">
          <CommentCard
            comment={comment}
            commentId={comment.uid}
            groupId={groupId}
            taskId={taskId}
            displayName={user.displayName}
          />
          <button onClick={() => logic.delete(user, groupId, comment, taskId)}>
            DELETE
          </button>
        </div>
      ))}
    </>
  )
}
