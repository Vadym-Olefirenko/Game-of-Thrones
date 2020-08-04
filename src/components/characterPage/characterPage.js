import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import ErrorMess from '../error/error';

export default class CharacterPage extends Component {

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    charSelect = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        if(this.state.error) {
            return <ErrorMess/>
        }
        return (
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.charSelect}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
        )
    }
}