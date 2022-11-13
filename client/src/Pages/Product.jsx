import React, { useState, useEffect } from 'react'
import Announcements from '../components/Announcements'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../config'
import axios from 'axios'

const Container = styled.div``

const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({
        padding:'10px',
        flexDirection: 'column',
    })}
`

const ImageContainer = styled.div`
    flex:1;
`

const Image = styled.img`
    width:30vw;
    object-fit:cover;
    ${mobile({
        height:'30vh'
    })}
`

const InfoContainer = styled.div`
    flex:1;
    padding: 0px 50px;
    display:flex;
    flex-direction: column;
    ${mobile({
        padding:'10px',
    })}
`

const Title = styled.h1`
    font-weight:200;
`

const ProductDescription = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-weight: 100px;
    font-size:40px;
    ${mobile({
        fontSize:'25px',
    })}
`

const Button = styled.button`
    padding: 10px;
    background-color: #fbb03b;
    border:none;
    cursor:pointer;
    font-weight:700;
    border-radius:5px;
    ${mobile({
        margin:'10px 0px',
    })}
`

const Product = () => {

    const location = useLocation();
    const id =  location.pathname.split("/")[2]
    const [product, setProduct] = useState({})

    useEffect(() => {
      const getProduct = async ()=>{
        try {
            const res = await axiosInstance.get("/product/find/"+id)
            setProduct(res.data.data)
        } catch (error) {
            
        }
    }
    getProduct()
    // console.log(product)
    }, [id])

    const handleClick = () =>{
        // dispatch(
        //     addProduct({...product,quantity,price:product.price * quantity})
        // )

    }
    
  return (
    <Container>
        <Announcements/>
        <Navbar/>
        <Wrapper>
            <ImageContainer>
                <Image src={`/uploads/${product.image}`}/>
            </ImageContainer>
            <InfoContainer>
                <Title>{product.name}</Title>
                <ProductDescription>
                    {product.description}
                </ProductDescription>
                <Price>UGX. {product.price}</Price>
                <Button onClick={handleClick}>ADD TO CART</Button>
            </InfoContainer>
        </Wrapper>
    </Container>
  )
}

export default Product