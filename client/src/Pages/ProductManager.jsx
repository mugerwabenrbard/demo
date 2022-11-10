import React from 'react'
import Announcements from '../components/Announcements'
import Navbar from '../components/Navbar'
import ProductsTable from '../components/ProductsTable'

const ProductManager = () => {
  return (
    <div>
        <Announcements/>
        <Navbar/>
        <h1 style={{textAlign:'center', margin:'20px'}}>Products Manager</h1>
        <ProductsTable/>
    </div>
  )
}

export default ProductManager