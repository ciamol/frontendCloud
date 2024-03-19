import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalShow = ({title,children,show,handleClose}) => {
    return (
        <Modal scrollable={true} show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title className='fw-bold'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>       
        </Modal>
    );
}

export default ModalShow;