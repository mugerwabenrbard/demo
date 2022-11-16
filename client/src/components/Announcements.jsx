import React from 'react'

import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    background-color: #201b56;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500
`

const Annouce = styled.p`
  margin:5px 10px;
  text-align:center;
`

const Announcements = () => {
  return (
    <Container>
        <Annouce>Super Deal! Free Shipping On orders Over UGX 50,000</Annouce>
    </Container>
  )
}

export default Announcements