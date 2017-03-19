import React from 'react'

import './modal.css'

const Modal = ({value, keyVal, closeModal}) => {
    return(
        <div className="modal">
            <div className="modal-dialog">
                
                <div className="modal-body">
                    <p>Key: {keyVal}</p>
                    <p>Value: {value}</p>
                </div>

                <div className="modal-footer">
                    <a href="#" className="btn" onClick={() => {closeModal()}}>Close</a>
                </div>
            </div>
        </div>
    )
}

export default Modal