import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export const GenerarPago = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn" variant='primary' onClick={handleShow}>
            Comprar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comprar</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            //!ACA VA EL BOTON DE MERCADO PAGO

        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
