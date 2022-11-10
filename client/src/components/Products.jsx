import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import {axiosInstance} from '../config'

const Container = styled.div`
    padding: 20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`

const Products = () => {
    const [result, setResult] = useState([])
        useEffect(() => {

            const getData = async() => {
                const res = await axiosInstance.get('/product/products')
                setResult(res.data.data)
            }
            getData()
        },[result])

  return (
    <Container>
        {result.slice(0,10).map(product=><Product key={result._id} item={product}/>)}
    </Container>
  )
}

export default Products