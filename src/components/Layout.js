import React from 'react'
import PostsList from '../features/posts/PostsList'
import { Outlet } from 'react-router-dom'//design the header and footer
import Header from './Header'


const Layout = () => {
  return (
    <>
        <Header/>
        <main className='App'>
            <Outlet/>
        </main>
    </>
  )
}

export default Layout