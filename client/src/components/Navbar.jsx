import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {mobile} from '../responsive'
import { Link } from 'react-router-dom';

// Styled Components
const Container = styled.div`
    height: 60px;
    -webkit-box-shadow: 5px 5px 15px 2px rgba(0,0,0,0.25); 
    box-shadow: 5px 5px 15px 2px rgba(0,0,0,0.25);
    ${mobile({
        height: "50px"
    })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    ${mobile({
        padding: "10px 0px"
    })}
`

const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
        display: "none"
    })}
`

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left:25px;
    padding: 5px;
`

const Input = styled.input`
    border:none;
    ${mobile({
        width: "50px"
    })}
`

const Center = styled.div`
    flex:1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight:bold;

    ${mobile({
        fontSize: '14px',
        margin: "0px 5px"
    })}
`

const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content: flex-end;
    ${mobile({
        flex:2,
        justifyContent: 'center',
    })}
`

const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile({
        fontSize: '9px',
        marginLeft: '10px'
    })}
`

const Navbar = () => {


  return (
    <Container>
        <Wrapper>
            <Left>
                <Link to='/' style={{textDecoration:'none', color:'#201b56'}}>
                    <Logo>MAKEUP SHOP.</Logo>
                </Link>
            </Left>
            <Right>
                {/* <Link to="/register">
                    <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link to="/login">
                    <MenuItem>LOGIN</MenuItem>
                </Link> */}
                <Link to="/manager" style={{textDecoration:'none', color:'#201b56'}}>
                    <MenuItem>PRODUCT MANAGER</MenuItem>
                </Link>
                <Link to="/new" style={{textDecoration:'none', color:'#201b56'}}>
                    <MenuItem>ADD PRODUCT</MenuItem>
                </Link>
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={2} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar