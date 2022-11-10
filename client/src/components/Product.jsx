import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'

const Info = styled.div`
    opacity:0;
    width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    left:0;
    z-index:3;
    display:flex;
    background-color: rgba(0,0,0,0.2);
    align-items:center;
    justify-content:center;
    transition: all 0.5s ease;
    cursor:pointer;
`

const Container = styled.div`
    flex:1;
    margin: 50px; 
    min-width: 285px;
    height: 350px;
    display:flex;
    align-items:center;
    justify-content:centre;
    position: relative;
    flex-direction: column;

    &:hover ${Info}{
        opacity:1;
    }
`
// const Circle = styled.div`
//     width:200px;
//     height:200px;
//     border-radius: 50%;
//     background-color: #f3f3f3;
//     position:absolute;
//     `
    const Image = styled.img`
    height:100%;
    z-index:2;
`
const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius: 50%;
    display:flex;
    background-color: #201b56;
    color:white;
    align-items:center;
    justify-content:center;
    margin:10px;
    transition: all 0.5s ease; 
    
    &:hover{
        background-color: #fbb03b;
        color:black;
        transform: scale(1.1);
    }
`
const Price = styled.h5`
    font-weight:bold;
    font-size: 20px;
    color: #201b56;
`
const PriceBox = styled.div`
    background-color: #fbb03b;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px
`


const Product = ({item}) => {
  return (
    <Container>
        <Image src={`/uploads/${item.image}`}/>
        <Info>
            <Icon>
                <ShoppingCartOutlinedIcon/>
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`}>
                    <Search style={{color: '#ffffff'}}/>
                </Link>
            </Icon>
        </Info>
            <h4>{item.name}</h4>
        <PriceBox>
            <Price>UGX. {item.price}</Price>
        </PriceBox>
    </Container>
  )
}

export default Product