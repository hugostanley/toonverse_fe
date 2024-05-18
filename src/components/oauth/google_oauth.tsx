import React from 'react'
import { Link } from 'react-router-dom'


function google_oauth() {
  return (
    <div>
        <Link to={"http://localhost:3000/auth/google_oauth2 "}>SIGN IN USING GOOGLE</Link>
    </div>
  )
}

export default google_oauth