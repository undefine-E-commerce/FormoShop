import React from 'react'
import { Navbar } from 'react-bootstrap'
import { NavSide } from '../Components/SideMenu/NavSide'
import { TheNavbar } from '../Components/Navbar'
import { HomeShops } from '../Components/HomeShops/HomeShops'
import "./Home.css"

export const Home = () => {
  return (
    <div className='row'>
        <TheNavbar/>
        <NavSide/><HomeShops/>
    </div>
  )
}