import React, { useEffect } from 'react'
import styled from 'styled-components'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from 'react';
import { mobile } from '../responsive';
import { axiosInstance } from '../config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
    width:100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({display:'none'})}
`

const Arrows = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f3f3f3;
    border-radius: 50%;
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    bottom: 0;
    margin: auto;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display:flex;
    transition: all 1.5s ease;
    transform: translateX(${props =>props.slideIndex * -100}vw);
`

const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
`

const ImageContainer = styled.div`
    flex:1;
    width: 50%;
`

const Image = styled.img`
    height: 100%;
    width: 60%;
`

const InfoContainer = styled.div`
    flex:1;
    padding: 50px; 
`

const Title = styled.h1`
    font-size: 50px;
`

const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
`

const Button = styled.button`
    padding:10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [result, setResult] = useState([])
    const [loaded, setLoaded] = useState(false)

    const handleClick = (direction) =>{
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }


    useEffect(() => {
        setLoaded(true)
        axiosInstance.get('/product/products')
        .then(res=>setResult(res.data.data))

    },[])
    
  return (
    <Container>
        {
            !loaded && <Backdrop open><CircularProgress color="inherit" /></Backdrop>
        }
        <Arrows direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlinedIcon/>
        </Arrows>
            {result.map(prdt => 
                <Wrapper key={prdt._id} slideIndex={slideIndex}>
                    <Slide>
                        <ImageContainer>
                            <Image src={prdt.image.url}/>
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{prdt.name}</Title>
                            <Description>{prdt.description}</Description>
                            <Button onClick={() => window.location = `/product/${prdt._id}`}>BUY NOW</Button>
                        </InfoContainer>
                    </Slide>
                </Wrapper>
            )}
        <Arrows direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlinedIcon/>
        </Arrows>
    </Container>
  )
}

export default Slider