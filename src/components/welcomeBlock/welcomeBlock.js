import React, {Component} from 'react';
import img from './welcomeimg.jpg';
import styled from 'styled-components';

const BlockHead = styled.h1`
    font-size: 36px;
    line-height: 110%;
    font-weight: bold;
    color: #fff;

`

const BlockSub = styled.p`
    font-size: 26px;
    line-height: 110%;
    font-weight: normal;
    color: #fff;
`

const BlockImg = styled.img`
    width: 100%;
`


export default class WelcomeBlock extends Component {
    render () {
        return (
            <>
                <BlockHead>Welcome!</BlockHead>
                <BlockSub>Here you can get various information about Game of Thrones universe.</BlockSub>
                <BlockImg src={img} alt=""img/>
            </>
        )
    }
}
