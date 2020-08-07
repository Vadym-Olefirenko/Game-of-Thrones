import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ErrorMess from '../../error/error';
import Services from '../../../services/services';
import {withRouter} from 'react-router-dom'


 class BooksPage extends Component {
    service = new Services();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render () {
        if(this.state.error) {
            return <ErrorMess/>
        }
        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)
            }}
            getData={this.service.getAllBooks}
            renderItem={({name}) => name}
            />
        )
    }
}

export default withRouter(BooksPage);