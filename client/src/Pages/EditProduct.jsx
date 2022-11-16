import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { axiosInstance } from '../config'
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
      width: "100%",
      height: "100%"
    })}
`
const Wrapper = styled.div`
    width:40%;
    padding: 20px;
    background-color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    ${mobile({
      width: "100%",
      margin: "20px"
    })}
`

const Title = styled.h1`
    font-size:24px;
    font-weight:00px;
    text-align: center;
    ${mobile({
      fontSize:"18px"
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
    const [image, setImage] = useState('')
    const [loaded,setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      setLoaded(true)
      const getProduct = async ()=>{
        try {
            const res = await axiosInstance.get("/product/find/"+id)
            setProduct(res.data.data)
            setImage(res.data.data.image.url)
        } catch (error) {
            console.log(error)
        }
    }
    getProduct()
    },[])

    const handleChange = (e) =>{
      const value = e.target.value
      setProduct({...product, [e.target.name]: value})
      console.log(product)
    }

    const handlePhoto = async(e) =>{
      const file = e.target.files[0]
      const base64 = await convertToBase64(file)
      setProduct({...product, image : base64})
      setImage(base64)
  }

  // Convert Image to base 64
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

    const handleCheck = (e) =>{
      setProduct({...product, featured: e.target.checked})
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      setLoaded(true)
      const formData = {
        label: product.label,
        brand: product.brand,
        name: product.name,
        price: product.price,
        ingredients: product.ingredients,
        description: product.description,
        featured: product.featured,
        image: product.image
        }
        // console.log(formData)
        axiosInstance.put(`/product/update/${id}`, formData)
        .then(res=>{
          console.log(res.data)
          navigate('/manager')
        })
        .catch(err=>console.log(err))
  }
  
  return (
    <div>
    <Navbar/>
    <Container>
        <Wrapper>
          {!loaded && <Backdrop open><CircularProgress color="inherit" /></Backdrop>}
            <Title>UPDATE PRODUCT</Title>
            <Image src={image}/>
            <Form onSubmit={handleSubmit}>
                <Input type="file" accept='.jpeg, .jpg, .png' onChange={handlePhoto}/>
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