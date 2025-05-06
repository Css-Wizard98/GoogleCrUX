import * as React from 'react';
import './Modal.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const CustomModal = ({ open, onClose, title, children, action }) => {
    return (<Modal
        open={open}
        onClose={() => onClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className='modal-body'>
            {title && <h3 className='title'>{title}</h3>}
            <div className='modal-content'>
                {children}
            </div>
            <div className='modal-footer'>
                {
                    action ?
                        action : <></>
                }
            </div>
        </div>
    </Modal>)
}

export default CustomModal;
