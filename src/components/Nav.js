import * as React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="nav">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/new" >New Tweet</NavLink>
        </nav>
    )
}