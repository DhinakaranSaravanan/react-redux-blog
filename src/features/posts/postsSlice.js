import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postAdapter = createEntityAdapter({
    sortComparer : (a,b) => b.date.localeCompare(a.date)
})
const initialState = postAdapter.getInitialState({
    /* [
    {
        id : 0,
        title : 'learning redux',
        content : 'dhuddu',
        date : sub(new Date(),{minutes : 10}).toISOString(),
        reactions :{
            thumbsUp : 0,
            wow :  0,
            heart : 0,
            rocket : 0,
            coffee : 0
        }
    },
    {
        id : 1,
        title : 'Subscribe',
        content : 'dk',
        date : sub(new Date(),{minutes : 5}).toISOString(),
        reactions :{
            thumbsUp : 0,
            wow :  0,
            heart : 0,
            rocket : 0,
            coffee : 0
        }
    }] */
    /* posts : [], */
    status : 'idle', // 'loading'|'succeeded'|'failed'
    error : null,
    count : 0
})
export const fetchPosts = createAsyncThunk('posts/fetchPosts',async () => {
    const response = await axios.get(POSTS_URL)
    return response.data; 
})

export const newPost = createAsyncThunk('posts/newPost', async (newPost) => {
    const response = await axios.post(POSTS_URL,newPost)
    return response.data
})
export const updatePost = createAsyncThunk('post/updatePost',async (originpost) => {
    const {id} = originpost
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, originpost)
        return response.data
    } catch (error) { 
        return error.message
        
    }  
})
export const deletePost = createAsyncThunk('post/deletePost', async (origipost) => {
    try { 
        const {id} = origipost
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    if(response?.status === 200) return origipost;
    return `${response?.status}:${response?.statusText}`;
    } catch (error) {
        return error.message        
    }
    
})

const postsSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {    
        /* postAdded(state,action){
            state.push(action.payload)
        } */
        postAdded : {
            reducer(state,action){
            state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                return{
                    payload : {
                        id : nanoid(),
                        title,
                        content,
                        date : new Date().toISOString(),
                        userId,
                        reactions :{
                            thumbsUp : 0,
                            wow :  0,
                            heart : 0,
                            rocket : 0,
                            coffee : 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload
            /* const existingPost = state.posts.find((e) => e.id === postId) */
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        increment(state, action){
            state.count = state.count+1
        }     
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending,(state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled,(state, action) => {
                state.status = "succeeded"
                //adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(),{minutes:min++}).toISOString()
                    post.reactions = {
                        thumbsUp : 0,
                        wow :  0,
                        heart : 0,
                        rocket : 0,
                        coffee : 0
                    } 
                    return post;
                    
                })
                //add data to state 
                /* state.posts = state.posts.concat(loadedPosts) */
                postAdapter.upsertMany(state,loadedPosts)
                //In posts array take a shallow copy of new post 
            })
            .addCase(fetchPosts.rejected,(state, action) => {
                state.status = "failed"
                state.error = action.error.message 
            })
            .addCase(newPost.fulfilled,(state, action) => {
                const sortPosts = state.posts.sort((a,b) => {
                    if(a.id>b.id) return 1
                    if(a.id<b.id) return -1
                    return 0                
                })
                const postId = sortPosts[sortPosts.length -1].id+1 || 0
                action.payload.id = postId
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                                                thumbsUp : 0,
                                                wow :  0,
                                                heart : 0,
                                                rocket : 0,
                                                coffee : 0
                                            } 
                /* state.posts.push(action.payload) */
                postAdapter.addOne(state,action.payload)

            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload){
                    console.log('update not complete');
                    console.log(action.payload);
                    return
                }
                /* const {id} = action.payload */
                action.payload.date = new Date().toISOString()
                /* const post = state.posts.filter((input) => input.id !== id)
                state.posts = [...post, action.payload] */
                postAdapter.upsertOne(state, action.payload )
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if(!action.payload){
                    console.log('delete could not complete');
                    console.log(action.payload);
                    return
                }
                const {id} = action.payload
                const post = state.posts.filter(post => post.id !== id)
                /* state.posts = post; */
                postAdapter.removeOne(state, id)
            })
    }
})
export const {
    selectAll : selectAllPosts,
    selectById :selectPostById,
    selectIds : selectPostIds
    } = postAdapter.getSelectors(state => state.posts)

/* export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)
export const selectAllPosts = (state) => state.posts.posts */

export const getPostsStatus = (state) => state.posts.status 
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count
export const selectPostByUser = createSelector(
    [selectAllPosts,(state,userId) => userId],
    (
        (posts,userId) => posts.filter(post => post.userId === userId)
    )
)
export const {increment,postAdded, reactionAdded} = postsSlice.actions
export default postsSlice.reducer