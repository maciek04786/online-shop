import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles & bootstrap
import "./Login.css"
import { Card, Form, Button, Spinner, Modal } from 'react-bootstrap'

export default function Login() {
  const [showModal, setShowModal] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Card className="login-form">
        <Card.Body>
          <Card.Title as="h3">Login</Card.Title>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            {isPending ? (
              <Spinner animation="border" />
            ) : (
              <Button variant="dark" type="submit">
                Login
              </Button>
            )}
            {error && <div className="error">{error}</div>}
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-3">Test login:</h5>
          <p className="mb-0">email: test@email.com</p>
          <p>password: 123456</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
