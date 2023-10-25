import React from 'react'
import "./navside.css"
import { Profile } from '../UserManag/Profile'
import {useAuth0} from "@auth0/auth0-react"
import { LoginButton } from '../UserManag/Login'
import { Filters } from '../Filters/FIlters'

export const NavSide = () => {
  const {isAuthenticated} = useAuth0()
  return (
    <>
<aside className="col-2 side-nav mt-5" >
      <div className='col side-bar '>
        {isAuthenticated ? <Profile/> : <LoginButton/>} 
      </div>
      <hr />
      <Filters/>
</aside>

    </>
  )
}
