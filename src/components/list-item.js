import React from 'react'

const ListItem = ({value, keyVal, toggleModal}) => {
    return(
        <li className="list-item" onClick={() => {
                toggleModal(value, keyVal);
            }}>
            <p>Key: {keyVal}</p>  
            <p className="value">Value: {value}</p>
        </li>
    )
}

export default ListItem