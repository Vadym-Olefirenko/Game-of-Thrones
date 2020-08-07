import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrorMess from '../error/error';

function ItemList ({getData, renderItem, onItemSelected}) {

    const [itemList, updateList] = useState([]);
    const [error, updateError] = useState(false);

    useEffect(() => {
        getData()
        .then(data => {
            updateList(data);
        })
        .catch(() => updateError(true))
    }, []);

    function renderItems (arr) {
       return arr.map((item) => {
            const idRegExp = /\/([0-9]*)$/;
            let id = item.url.match(idRegExp)[1];
            
            
            let itemData = renderItem(item);
            return (
                <li 
                    className="list-group-item"
                    key={id}
                    onClick={() => onItemSelected(id)}
                >
                 {itemData}
                </li>
            )
        })
    }
   
    if(error) {
        return <ErrorMess/>
    }

    if (!itemList) {
        return <Spinner/>
    }
    
    const listRendered = renderItems(itemList);
    return (
        <ul className="item-list list-group">
            {listRendered}
        </ul>
    );
    
}

export default ItemList;