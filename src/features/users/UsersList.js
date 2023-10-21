import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users = useSelector(selectAllUsers)
    console.log(users);
    const renderedUser = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`} >{user.name}</Link>
        </li>
    ))
    console.log(renderedUser);
  return (
    <section>
        <h2>Users</h2>
        {/* <br/> */}
        <ul>{renderedUser}</ul>
    </section>
  )
}

export default UsersList