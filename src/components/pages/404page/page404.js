import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';

const ErrorMessage = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 80vh;
    
    h1 {
        font-size: 36px;
        line-height: 110%;
        color: #fff;
    }

    button {
        width: 180px;
    }

    .link-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
`

export default class Page404 extends Component {

    render () {
        return (
            <ErrorMessage>
                <h1>Page adress is incorect!</h1>
                <Button>
                <Link to="/" className="link-btn">Main page</Link>
                </Button>
               
            </ErrorMessage>
        )
    }
} 