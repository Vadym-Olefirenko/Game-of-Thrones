import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error';
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        this.props.getData()
            .then(itemList => {
                this.setState({
                    itemList: itemList
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
            itemList: null,
            error: true
        })
    }

    renderItems = (arr) => {
       return arr.map((item) => {
            const idRegExp = /\/([0-9]*)$/;
            let id = item.url.match(idRegExp)[1];
            
            
            let itemData = this.props.renderItem(item);
            return (
                <li 
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                >
                 {itemData}
                </li>
            )
        })
    }


    render() {
        const {itemList, error} = this.state;

        if(error) {
            return <ErrorMess/>
        }

        if (!itemList) {
            return <Spinner/>
        }
    
        const listRendered = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
                {listRendered}
            </ul>
        );
    }
}