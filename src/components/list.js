import React from 'react'

import ListItem from './list-item'
import './list.css'

const List = ({data, toggleModal}) => {
    return(
        <ul
            className="list-container">
            {
                data
                .map((elem) => {
                    return (
                        <ListItem key={elem.key} value={elem.value} keyVal={elem.key} toggleModal={toggleModal}/>
                    );
                })
            }
        </ul>
    )
}

export default List