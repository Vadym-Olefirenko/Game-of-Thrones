import React, {useEffect, useState} from 'react';
import './randomChar.css';
import Services from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error';


function RandomChar() {
    const service = new Services();
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let setCharFunc = () => {
        let id = Math.floor(Math.random()*140 + 25);
        service.getChar(id)
            .then((char) => {
                setChar(char)
            })
            .then(setLoading(false))
            .catch(() => setError(true))
    }
   
    useEffect(() => {
        setCharFunc();
        let changeChar = setInterval(() => {
            setCharFunc();
        }, 5000);

        return () => {
            clearInterval(changeChar);
        }
    }, []);
   
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

export default RandomChar;