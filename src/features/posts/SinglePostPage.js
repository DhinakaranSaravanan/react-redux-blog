import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

const SinglePostPage = () => {
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId))) 
    console.log(post); 
    if(!post){
      return(
        <section>
            <h2>Post not found!</h2>
        </section>
      )
    }  

  return (

    <article>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p className='postCredit'> 
              <Link to ={`/post/edit/${post.id}`} >Edit post</Link>               
                <PostAuthor userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
                <ReactionButtons post={post} /> 
              </p>
              
    </article>
  )
}

export default SinglePostPage