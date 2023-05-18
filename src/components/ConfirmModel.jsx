import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModel(props) {

  const [show, setShow] = useState(true);

  const confirm = () => props.onConfirm(true)
  const handleDismiss = () => props.onClose(false)

  return (
    <>
      <Modal show={show} onHide={handleDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDismiss}>
            No
          </Button>
          <Button variant="primary" onClick={confirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModel;