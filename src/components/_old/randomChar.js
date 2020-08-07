import React, {Component} from 'react';
import './randomChar.css';
import Services from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error';


export default class RandomChar extends Component {
    
    service = new Services();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.setChar();
        this.changeChar = setInterval(() => {
            this.setChar();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.changeChar);
    }

    onCharLoaded = char => {
        this.setState({
            char: char,
            loading: false
        });
    }

    onError = err => {
        this.setState({
            error: true,
            loading: false
        })
    }

    setChar = () => {
        let id = Math.floor(Math.random()*140 + 25);
        this.service.getChar(id)
            .then(this.onCharLoaded)
    }
    render() {
        const{char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMess/> : null;
        const spin = loading ? <Spinner/> : null;
        const block = !(loading || error) ? <BlockLayout char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spin}
                {block}
            </div>
        );
    }
}

const BlockLayout = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}