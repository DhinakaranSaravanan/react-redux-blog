import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

/* let */const PostsExpert = ({postId}) => {
  const post =  useSelector(state => selectPostById(state, Number(postId)))
  
  return (
    <article>
      {/* <Link to = {`/post/${post.id}`}> */}
              <h3>{post.title}</h3>
              <p className='excerpt'>{post.body.substring(0,60)}...</p>
              <p className='postCredit'>
                <Link to = {`/post/${post.id}`}>view post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
                <ReactionButtons post={post} />
              </p>
              {/* </Link> */}
          </article>
  )
}

/* PostsExpert = React.memo(PostsExpert) */

export default PostsExpert