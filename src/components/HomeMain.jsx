import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
export default function HomeMain() {
  return (
    <div className='home'>
      <img src="/Images/vector.jpeg" alt="" />

      <Link to='/todos' className="go">
      <div >
         Go To Todos
      </div>
      </Link>
    </div>
  )
}
