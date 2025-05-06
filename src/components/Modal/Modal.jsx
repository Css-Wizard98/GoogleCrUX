import * as React from 'react';
import './Modal.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const CustomModal = ({ open, onClose, title, children }) => {
    return (<Modal
        open={open}
        onClose={()=>onClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className='modal-content'>
        {title && <h3 className='title'>{title}</h3>}
        {children}
        </div>
    </Modal>)
}

export default CustomModal;
