import React, { useState } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Desain1 from '../../assets/leaf 1.png'
import Desain2 from '../../assets/atlas 1.png'
import {API} from '../../config/api'
import Swal from 'sweetalert2';





function ModalRegis(props) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })

  const {name, email, phone, password} = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const body = JSON.stringify(form)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await API.post('/register', body, config)
          Swal.fire(
            'Logout!',
            'Your account has been Logout.',
            'success'
          )
        }
      })
      const res = await API.post('/register', body, config)
      if (res.data.status === 'success'){
        props.onHide(false)
        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
      }else{
        console.log(e);
        // alert('something wrongs')
      }
    } catch (e) {
      console.log(e);
      // alert(e)
    }
  }

    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Row>
            <Col sm={4}>
                <img src={Desain2} alt="" 
                style={{height: "150px", width: "60px"}}/>
            </Col>
            <Col sm={{ span: 4, offset: 3}}>
                <img src={Desain1} alt="" 
                style={{height: "150px", width: "111px"}}/>
            </Col>
        </Row>
        <Modal.Body>
          <h4 className='text-center'>Register</h4>
          <Form method='post' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label style={{fontWeight: "bold"}}>Full Name</Form.Label>
                <Form.Control 
                type="name" 
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter Name" 
                style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', 
                border: 'none'}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{fontWeight: "bold"}}>Email address</Form.Label>
                <Form.Control 
                type="email" 
                name='email'
                value={email}
                onChange={handleChange}
                placeholder="Enter Email" 
                style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', 
                border: 'none'}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label style={{fontWeight: "bold"}}>Phone</Form.Label>
                <Form.Control 
                type="phone" 
                name='phone'
                value={phone}
                onChange={handleChange}
                placeholder="Enter Phone" 
                style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', 
                border: 'none'}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{fontWeight: "bold"}}>Password</Form.Label>
                <Form.Control 
                type="password"
                name='password'
                value={password} 
                onChange={handleChange}
                placeholder="Enter Password" 
                style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', 
                border: 'none'}}/>
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit"
                style={{fontWeight: "bold"}}>
                    Submit
                </Button>
            </div>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }
  

export default ModalRegis