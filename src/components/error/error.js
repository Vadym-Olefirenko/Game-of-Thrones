import React from 'react';
import styled from 'styled-components';
import img from './er.jpg';

const Image = styled.img`
    width: 100%;
`

const MessDiv = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
`

const ErrorMess = () => {
    return (
        <>
            <Image src={img}/>
            <MessDiv>Something goes wrong :(</MessDiv>
        </>
    )
}

export default ErrorMess;