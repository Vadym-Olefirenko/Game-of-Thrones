import React, {Component} from 'react';
import Services from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error'
import './charDetails.css';

export default class CharDetails extends Component {
    service = new Services();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;

        if(!charId) {
            return;
        }

        this.setState({
            loading: true
        })
        

        this.service.getChar(charId)
            .then(this.onLoaded)
            .catch(() => this.onError) 
    }

    onError() {
        this.setState({
            char: null,
            error: true
        })
    }


    render() {
        if (!this.state.char && this.state.error) {
           return <ErrorMess/>
        } else if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }
  
        const {name, gender, born, died, culture} = this.state.char;
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
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}