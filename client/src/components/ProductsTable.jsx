import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config';

const Container = styled.div`
    margin:10px;
`
const Table = styled.table`
    width: 100%;
    margin: 0;
	padding: 0;
	border: 1px solid #201b56;
	border-collapse: collapse;
	color: #20156;
`
const Thead = styled.thead`
    background-color: #201b56;
`
const TH = styled.th`
    font-size: 20px;
    font-weight:normal;
    color: #fbb03b;
    padding: 10px;
    border: 1px solid #fbb03b;
    letter-spacing: 0.075rem;
`
const TR = styled.tr`
    padding: 20px;
`
const Tbody = styled.tbody`
    border: 1px solid #201b56;
`
const TD = styled.td`
    padding: 20px;
    border: 1px solid #201b56;
    text-align: left;
    text-wrap: wrap
`
const Image = styled.img`
    width:30px;
    height:30px;
`
const Actions = styled.div`
    display:flex;
`
const Icon = styled.div`
    padding: 0px 10px;
    cursor: pointer;
`
const ProductsTable = () => {

    const [result, setResult] = useState([])
        useEffect(() => {

            const getData = async() => {
                const res = await axiosInstance.get('/product/products')
                setResult(res.data.data)
            }
            getData()
        },[result])

        const handleDelete = (id) => {
            axiosInstance.delete(`/product/delete/${id}`)
            window.location.reload(true)
        }

  return (
    <Container>
        <Table>
            <Thead>
                <TR>
                    <TH>No.</TH>
                    <TH>Image</TH>
                    <TH>Label</TH>
                    <TH>Brand</TH>
                    <TH>Name</TH>
                    <TH>Price</TH>
                    <TH>Stock</TH>
                    <TH>Actions</TH>
                </TR>
            </Thead>
            <Tbody>
                {result ? result.map((product, i) =>
                <TR key={product._id}>
                    <TD>{++i}</TD>
                    <TD><Image src={`/uploads/${product.image}`} alt="" /></TD>
                    <TD>{product.label}</TD>
                    <TD>{product.brand}</TD>
                    <TD>{product.name}</TD>
                    <TD>ugx.{product.price}</TD>
                    <TD>{product.numberInStock}</TD>
                    <TD>
                        <Actions>
                            <Link to={`/edit/${product._id}`}>
                                <Icon style={{borderRight:'2px solid #201b56'}}><BorderColorIcon style={{color: 'green'}}/></Icon>
                            </Link>
                                <Icon onClick={()=>handleDelete(product._id)}><DeleteOutlineIcon style={{color: 'red'}}/></Icon>
                        </Actions>
                    </TD>
                </TR>
                ): <TR><TD colSpan={8}> NO PRODUCTS FOUND</TD></TR>}
            </Tbody>
        </Table>
    </Container>
  )
}

export default ProductsTable