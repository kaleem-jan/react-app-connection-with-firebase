
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ClientServices from "../services/ClientServices";

function StaticExample(props) {
  const [showModal, setShow] = useState(false);
  const [nameChange, setNameChange] = useState("");
  const [nameEmail, setNameEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    setNameChange(props?.data?.name);
    setNameEmail(props?.data?.email);
    setPassword(props?.data?.password);
  },[props?.data])

  const handleClose = () => {
    props.closeModal()
  };
  const handleShow = () => setShow(true);
  

  const update = () =>{
    ClientServices.updatedClient(props.data.id, {
      name: nameChange,
      email: nameEmail,
      password: password,
    }).then(()=>{
      handleClose();
    })
    window.location.reload();
    
  }
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      </div>
      <Modal show={props.openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <Form.Label htmlFor="inputPassword5">Name</Form.Label>
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={nameChange}
              onChange={(value)=>{
                setNameChange(value.target.value)
              }}
              
            />
            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={nameEmail}
              onChange={(value)=>{
                setNameEmail(value.target.value)
              }}
            />
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={password}
              onChange={(value)=>{
                setPassword(value.target.value)
              }}
            />
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={update}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaticExample;