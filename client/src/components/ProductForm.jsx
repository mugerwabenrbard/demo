import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {axiosInstance} from '../config'
import { mobile } from '../responsive'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)), 
    url("https://cdn.pixabay.com/photo/2018/09/05/15/47/black-white-3656500_960_720.jpg")
     center no-repeat;
    background-size: 100%;
    display:flex;
    align-items:center;
    justify-content: center;
    ${mobile({
        width:'100%',
        height:'100%'
    })}
`
const Wrapper = styled.div`
    width:40%;
    padding: 20px;
    background-color:white;
    ${mobile({
        width:'100%',
        margin: "20px 0"
    })}
`

const Title = styled.h1`
    font-size:24px;
    font-weight:00px;
    text-align: center;
    ${mobile({
        fontSize:'18px',
        marginBottom: '10px'
    })}
`

const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
`

const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:20px 10px 0px 0px;
    padding:10px;
`

const TextArea = styled.textarea`
    flex:1;
    min-width:40%;
    margin:20px 10px 0px 0px;
    padding:10px;
`

const Button = styled.button`
    margin-top:20px;
    padding: 10px 15px;
    width: 40%;
    border:none;
    font-weight: 700;
    font-size: 18px;
    background-color: #fbb03b;
    cursor:pointer;
`
const MyCheckbox = styled.div`
    width: 60%;
    display:flex;
    justify-content:start;
    align-items: center;
`
const Span = styled.span`
    font-size: 16px;
    font-weight: bold;
    margin: 20px 10px 10px 10px
`

const ProductForm = () => {

    const [label, setLabel] = useState('')
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [description, setDescription] = useState('')
    const [featured, setFeatured] = useState(false)
    const [image, setImage] = useState('')
    const [message,setMessage] = useState('')
    const history = useNavigate()
    const [data,setData] = useState({})
    const [loaded, setLoaded] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoaded(true)
        const formData = {
        label: label,
        brand: brand,
        name: name,
        price: price,
        ingredients: ingredients,
        description: description,
        featured: featured,
        image: image
        }
        axiosInstance.post('/product/add', formData).then(res=>{
            if(res.data.status === 'FAILED TRY'){
                setMessage(res.data.message)
                console.log(res.data.data)
            }else{
                setData(res.data)
                console.log(res.data)
                history('/manager')
            }
        }).catch(err=>console.log(err))
    
    }

    const handleImageChange = async(e) =>{
        const file = e.target.files[0]
        // console.log(file)
        const base64 = await convertToBase64(file)
        setImage(base64)
    }

    const convertToBase64 = (file) =>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () =>{
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) =>{
                reject(error)
            }
        })
    }
  return (
    <Container>
        <Wrapper>
            <Title>CREATE NEW PRODUCT</Title>
            {!loaded ? <p style={{color:'red', textAlign:'center', fontSize:'16px'}}>{message}</p> : <Backdrop
                open><CircularProgress color="inherit" /></Backdrop>}
            
            <Form onSubmit={handleSubmit}>
                <Input type="file" onChange={e=>handleImageChange(e)}/>
            <img src={image} width='70px'/>
                <Input placeholder="Label" onChange={e=>setLabel(e.target.value)}/>
                <Input placeholder="Brand" onChange={e=>setBrand(e.target.value)}/>
                <Input placeholder="Name" onChange={e=>setName(e.target.value)}/>
                <Input type='number' placeholder="Price" onChange={e=>setPrice(e.target.value)}/>
                <Input placeholder="Ingredients" onChange={e=>setIngredients(e.target.value)}/>
                <TextArea placeholder="Description" onChange={e=>setDescription(e.target.value)}/>
                <MyCheckbox>
                    <Span>Featured:</Span>
                    <Input type='checkbox' onChange={e => setFeatured(e.target.checked)}/>
                </MyCheckbox>
                <Button>Add New</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default ProductForm