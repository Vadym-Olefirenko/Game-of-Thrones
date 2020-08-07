import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error'
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};
export default class ItemDetails extends Component {
   
    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onLoaded = (item) => {
        this.setState({
            item: item,
            loading: false
        })
    }

    updateItem() {
        const {itemId, getItem} = this.props;

        if(!itemId) {
            return;
        }

        this.setState({
            loading: true
        })
        

        getItem(itemId)
            .then(this.onLoaded)
            .catch(() => this.onError) 
    }

    onError() {
        this.setState({
            item: null,
            error: true
        })
    }


    render() {
        if (!this.state.item && this.state.error) {
           return <ErrorMess/>
        } else if (!this.state.item) {
            return <span className="select-error">Click on list!</span>
        }
  
        const {item} = this.state;
        const {name} = item;
        if(this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}