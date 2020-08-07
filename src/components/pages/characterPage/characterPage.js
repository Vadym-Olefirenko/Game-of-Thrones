import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMess from '../../error/error';
import Services from '../../../services/services';
import RowBlock from '../../rowBlock/rowBlock'


export default class CharacterPage extends Component {
    service = new Services();

    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    itemSelect = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        if(this.state.error) {
            return <ErrorMess/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.itemSelect}
            getData={this.service.getPersons}
            renderItem={({name}) => name}
            />
        )

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getItem={this.service.getChar}
                >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
            <RowBlock list={itemList} details={charDetails}/>
        )
    }
}