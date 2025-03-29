import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'}>
        <img src="uberLogo.png" alt="" className="w-20 ml-7" />
    </Link>
  )
}

export default Logo