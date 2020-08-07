import React, {Component} from 'react';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import Services from '../../../services/services';

export default class BooksItem extends Component {
    service = new Services();
   
    render () {
        return (
            <ItemDetails 
            itemId={this.props.bookId}
            getItem={this.service.getBook}
            >
            <Field field='numberOfPages' label='Number of Pages'/>
            <Field field='publisher' label='Publisher'/>
            <Field field='released' label='Released'/>
        </ItemDetails>
        )
    }
} 