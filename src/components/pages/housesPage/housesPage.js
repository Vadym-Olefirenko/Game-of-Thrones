import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMess from '../../error/error';
import Services from '../../../services/services';
import RowBlock from '../../rowBlock/rowBlock'


export default class HousePage extends Component {
    service = new Services();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    itemSelect = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render () {
        if(this.state.error) {
            return <ErrorMess/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.itemSelect}
            getData={this.service.getAllHouses}
            renderItem={({name}) => name}
            />
        )

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getItem={this.service.getHouse}
                >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                {/* <Field field='overlord' label='Overlord'/> */}
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock list={itemList} details={charDetails}/>
        )
    }
}