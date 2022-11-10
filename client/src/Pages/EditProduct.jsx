import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { axiosInstance } from '../config'

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
    display:flex;
    flex-direction:column;
    align-items:center;
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
const Image = styled.img`
  height: 70px;
  width: 70px;
  margin: 20px;
`
const P  = styled.p`
  font-weight:bold;
  font-size: 16px;
  color:green;
`

const EditProduct = () => {
    const location = useLocation();
    const id =  location.pathname.split("/")[2]
    const [product, setProduct] = useState({})
    const [response, setResponse] = useState({})

    useEffect(() => {
      const getProduct = async ()=>{
        try {
            const res = await axios.get("/product/find/"+id)
            setProduct(res.data.data)
        } catch (error) {
            
        }
    }
    getProduct()
    },[])

    const handleChange = (e) =>{
      setProduct({...product, [e.target.name]: e.target.value})
    }

    const handlePhoto = (e) =>{
      setProduct({...product, image : e.target.files[0]})
    }

    const handleCheck = (e) =>{
      setProduct({...product, featured: e.target.checked})
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      const formData = new FormData()
      formData.append('label', product.label)
      formData.append('brand', product.brand)
      formData.append('name', product.name)
      formData.append('price', product.price)
      formData.append('ingredients', product.ingredients)
      formData.append('description', product.description)
      formData.append('featured', product.featured)
      formData.append('image', product.image)
      axios.put(`/product/update/${id}`, formData).then(res=>setResponse({...res.data})).catch(err=>console.log(err))
      console.log(response)
      window.location.reload(true)
  }
  
  return (
    <div>
    <Navbar/>
    <Container>
        <Wrapper>
            <Title>UPDATE PRODUCT</Title>
            <Image src={`/uploads/${product.image}`}/>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Input type="file" accept='.jpeg, .jpg, .png' defaultValue={product.image} filename='image' onChange={handlePhoto}/>
                <Input defaultValue={product.label} name='label' placeholder="Label" onChange={handleChange}/>
                <Input defaultValue={product.brand} name='brand' placeholder="Brand" onChange={handleChange}/>
                <Input placeholder="Name" name='name' defaultValue={product.name} onChange={handleChange}/>
                <Input type='number' name='price' defaultValue={product.price} placeholder="Price" onChange={handleChange}/>
                <Input placeholder="Ingredients" name='ingredients' defaultValue={product.ingredients} onChange={handleChange}/>
                <TextArea placeholder="Description" name='description' defaultValue={product.description} onChange={handleChange}/>
                <MyCheckbox>
                    <Span>Featured:</Span>
                    <Input type='checkbox' name='featured' onChange={handleCheck}/>
                </MyCheckbox>
                
                <Button>Update</Button>
            </Form>
        </Wrapper>
    </Container>
    </div>
  )
}

export default EditProduct