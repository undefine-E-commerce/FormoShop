import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { AddSqrPlus } from '../../assets/Icons/Components/AddSqrPlus';

export const CreateProduct = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="col-md-3 mb-4" variant='black' onClick={handleShow}>
        <AddSqrPlus />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control type="text" placeholder="Titulo" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Describa el producto</Form.Label>
              <Form.Control type="text" placeholder="Descripción" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ingrese precio</Form.Label>
              <Form.Control type="text" placeholder="Precio" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};
