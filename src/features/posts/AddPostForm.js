import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { postAdded, newPost } from './postsSlice'
/* import { nanoid } from '@reduxjs/toolkit' */
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'


const AddPostForm = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const navigator =useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [requestStatus, setRequestStatus] = useState('idle')

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)
    const onAuthorChange = (e) => setUserId(e.target.value)

    /* const canSave = Boolean(title) && Boolean(content) && Boolean(userId) */
    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'
    /* const onSavePostClicked = () => {
        // if(title && content){
        //     dispatch(postAdded({id:nanoid(), title,content}))
        // }
        if(title && content){
            dispatch(postAdded(title, content, userId))
        }
        setContent('')
        setTitle('')
    } */
    const onSavePostClicked = () => {
        if(canSave){
            try {
                setRequestStatus('pending')
                dispatch(newPost({title, body : content, userId})).unwrap()
                //unwrap() return only the specific data
                setTitle('')
                setContent('')
                setUserId('')
                navigator('/')

            } catch (error) {
                console.log(error.message);
                
            } finally{
                setRequestStatus('idle')    
            }
        }        
    }
    const usersOption = users.map((value) => (
        <option key={value.id} value={value.id}>
            {value.name}
        </option>
    ))

  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor='postTitle' >Post Title</label>
            <input
                type='text'
                required
                id='postTitle'
                value={title}
                onChange={onTitleChange}
            />
            <label htmlFor='authorPost'>Author</label>
            <select id='authorPost' value={userId} onChange={onAuthorChange}>
                <option value='' ></option>
                {usersOption}
            </select>
            <label htmlFor='postContent' >Post Content</label>
            <textarea                
                required
                id='postContent'
                name='postContent'
                value={content}
                onChange={onContentChange}
            />
            <button
                type='button'
                disabled = {!canSave} 
                onClick={onSavePostClicked}
            >save post</button>
        </form>
    </section>
  )
}

export default AddPostForm