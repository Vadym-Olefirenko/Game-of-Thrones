import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import './app.css'
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMess from '../error/error';
import CharacterPage from '../characterPage/characterPage'

export default class App extends Component {

   state = {
       showRandomChar: true,
       error: false    
   }

   componentDidCatch() {
       this.setState({
           error: true
       })
   }

   onToggleChar = () => {
       this.setState(() => {
           return {
            showRandomChar: !this.state.showRandomChar
           }
       })
   }


    render () {

        const randomChar = this.state.showRandomChar ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMess/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button 
                                onClick={this.onToggleChar}
                                className="char-btn"
                            >Random charachter</Button>
                            {randomChar}
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        )
    }
}

