import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import './app.css'
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMess from '../error/error';
import CharacterPage from '../pages/characterPage/characterPage';
import BooksPage from '../pages/booksPage/booksPage';
import HousePage from '../pages/housesPage/housesPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BooksItem from '../pages/booksItem/booksItem'
import WelcomeBlock from '../welcomeBlock/welcomeBlock';
import Page404 from '../pages/404page/page404'

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
            <Router>
                <div className="app"> 
                <Container>
                    <Header />
                </Container>
                <Container>
                <Switch>
                    <Route path="/" exact component={() => {
                        return (
                            <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <Button 
                                    onClick={this.onToggleChar}
                                    className="char-btn"
                                >Random charachter</Button>
                                {randomChar}
                            </Col>
                            <Col lg={{size: 6, offset: 1}}>
                                <WelcomeBlock/>
                            </Col>
                            </Row>
                        )
                    }}/>
                    <Route path="/characters" exact component={CharacterPage}/>
                    <Route path="/houses" exact component={HousePage}/>
                    <Route path="/books" exact component={BooksPage}/>
                    <Route path="/books/:id" exact render={
                        ({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>;
                        }
                    }/>
                   <Route path="*" component={Page404} />
                </Switch>
                </Container>
            </div>
            </Router>
        )
    }
}

