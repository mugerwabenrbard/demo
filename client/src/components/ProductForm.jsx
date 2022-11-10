import { Checkbox } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import {axiosInstance} from '../config'

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
`
const Wrapper = styled.div`
    width:40%;
    padding: 20px;
    background-color:white;
`

const Title = styled.h1`
    font-size:24px;
    font-weight:00px;
    text-align: center;
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

    const handleSubmit = (e) =>{
        e.preventDefault()
        alert('oke')
        // const formData = new FormData()
        // formData.append('label', label)
        // formData.append('brand', brand)
        // formData.append('name', name)
        // formData.append('price', price)
        // formData.append('ingredients', ingredients)
        // formData.append('description', description)
        // formData.append('featured', featured)
        // formData.append('image', image)
        // axiosInstance.post('/product/add', formData).then(res=>console.log(res.data)).catch(err=>console.log(err))
        // window.location = `/product/${}`
        // window.location.reload(true)
    
    }
  return (
    <Container>
        <Wrapper>
            <Title>CREATE NEW PRODUCT</Title>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Input type="file" accept='.jpeg, .jpg, .png' filename='image' onChange={e=>setImage(e.target.files[0])}/>
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