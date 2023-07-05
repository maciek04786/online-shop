import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles & bootstrap
import { Card, Form, Button, Spinner } from "react-bootstrap"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, error, isPending } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()

    signup(email, password)
  }

  return (
    <div>
      <Card className="login-form">
        <Card.Body>
          <Card.Title as="h3">Signup</Card.Title>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
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
                Signup
              </Button>
            )}
            {error && <div className="error">{error}</div>}
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
