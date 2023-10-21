import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectAllUsers, selectUserById } from './usersSlice'
import { selectAllPosts, selectPostByUser } from '../posts/postsSlice'

const UserPage = () => {
    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))
    console.log(user);

    /* const postsForUser = useSelector(state => {
        const allPosts = selectAllPosts(state)
        return allPosts.filter(post => post.userId === Number(user.id))}) */

    const postsForUser = useSelector(state => selectPostByUser(state, Number(userId)))

    const postTitle = postsForUser.map(post => (
        <li key={post.id} >
            <Link to={`/post/${post.id}`} >{post.title}</Link>
        </li>
    ))

  return (
    <section>
        <h2>{user?.name}</h2>
        <ul>{postTitle}</ul>
    </section>
  )
}

export default UserPage