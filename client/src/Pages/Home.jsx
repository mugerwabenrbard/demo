import React from 'react'
import Announcements from '../components/Announcements'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <div>
      <Announcements/>  
      <Navbar/>
      <Slider/>
      <h1 style={{textAlign:'center', color: '#201b56', margin:'10px 0 0 0'}}>SHOP</h1>
      <Products/>
    </div>
  )
}

export default Home