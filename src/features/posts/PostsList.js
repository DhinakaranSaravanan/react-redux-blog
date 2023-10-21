import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, selectPostIds } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import PostsExpert from './PostsExpert'


const PostsList = () => {
   /*  const dispatch = useDispatch() */
    const sortPosts = useSelector(selectPostIds)
    /* console.log(posts); */
    console.log(sortPosts);
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostsError)

   /*  useEffect(() => {
      if(postsStatus === 'idle'){
        dispatch(fetchPosts())
      }
    },[postsStatus, dispatch]) */

    let renderedPosts;
    if(postsStatus === 'loading'){
      renderedPosts = <p>Loading...</p>
    } else if(postsStatus === 'succeeded'){
    //sortposts take a shallow copy of posts
    /* const sortPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date)) */
    /* const renderedPosts = sortPosts.map((post) =>  */
    renderedPosts = sortPosts.map((postId) => 
      <PostsExpert key={postId} postId ={postId}/>
      /* (
          <article key = {post.id}>
              <h3>{post.title}</h3>
              <p>{post.content.substring(0,100)}</p>
              <p className='postCredit'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
                <ReactionButtons post={post} />
              </p>
          </article>
      ) */
      )/* .reverse() */
      /* console.log(renderedPosts); */
    } else if(postsStatus === 'failed'){
      renderedPosts = <p>{postsError}</p>
    }
  return (
    <section>
        {/* <h2>Posts</h2> */}
        {renderedPosts}
    </section>
  )
}

export default PostsList