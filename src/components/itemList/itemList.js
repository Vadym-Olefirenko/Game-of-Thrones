import React, {Component} from 'react';
import './itemList.css';
import Services from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error';
export default class ItemList extends Component {

    service = new Services();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.service.getPersons()
            .then(charList => {
                this.setState({
                    charList: charList
                })
            })
            .catch(() => this.onError)
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onError() {
        this.setState({
            char: null,
            error: true
        })
    }

    renderItems = (arr) => {
       return arr.map((item) => {
            let charUrl = item.url;
            let id = charUrl.substring(charUrl.length - 2 )
            return (
                <li 
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}
                >
                 {item.name}
                </li>
            )
        })
    }


    render() {
        const {charList, error} = this.state;

        if(error) {
            return <ErrorMess/>
        }

        if (!charList) {
            return <Spinner/>
        }
    
        const listRendered = this.renderItems(charList);
        return (
            <ul className="item-list list-group">
                {listRendered}
            </ul>
        );
    }
}