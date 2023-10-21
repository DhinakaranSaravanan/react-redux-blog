import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, selectPostById, updatePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const EditPost = () => {
    const {postId} = useParams()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const users = useSelector(selectAllUsers)

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)
    const onAuthorChange = (e) => setUserId(e.target.value)

    if(!post){
        return 
            <section>Post not found</section>
    }

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = () => {
        if(canSave){
            try {
                setRequestStatus('pending')
                dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigator(`/post/${postId}`)   

            } catch (err) {
                console.log('failed to save the post');                
            } finally{
                setRequestStatus('idle')      
            }
        }
    }
    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({id:post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('') 
            navigator('/')
            
        } catch (err) {
            console.log('failed to delete the post', err);
            
        } finally{
            setRequestStatus('idle')
        }
    }
    const usersOption = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>))

  return (
    <section>
        <h2>EDIT POST</h2>
        <form>
        <label htmlFor='title'>Title</label>
        <input             
             id='title'
             type='text'
             name='title'             
             value={title}
             onChange={onTitleChange}
        />
        <label htmlFor='author'>Author</label>
        <select id='author' value={users.id} onChange={onAuthorChange}>
            <option value=''></option>
            {usersOption}
        </select>
        <label htmlFor='body'>Body</label>
        <textarea            
            id='body'
            name='body'            
            value={content}
            onChange={onContentChange}
        />
        <button
            type='button'
            onClick={onSavePostClicked}
            disabled={!canSave}
        >save post</button>
        <button
            className='deleteButton'
            type='button'
            onClick={onDeletePostClicked}            
        >delete post</button>
        </form>
    </section>
  )
}

export default EditPost