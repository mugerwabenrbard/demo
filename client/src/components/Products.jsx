import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import {axiosInstance} from '../config'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
    padding: 20px;
    margin-bottom: 30px;    
    background-color: #f3f3f3;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Products = () => {
    const [result, setResult] = useState([])
    const [loaded, setLoaded] = useState(false)
        useEffect(() => {
            setLoaded(true)
            const getData = async() => {
                const res = await axiosInstance.get('/product/products')
                setResult(res.data.data)
            }
            getData()
        },[])

  return (
    <Container>
        {!loaded ? <Backdrop open><CircularProgress color="inherit" /></Backdrop> :<>{result.slice(0,10).map(product=><Product key={result._id} item={product}/>)}</> }
       
    </Container>
  )
}

export default Products