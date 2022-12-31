import React from 'react'

// styles & bootstrap
import "./Notifications.css"
import { Container, ListGroup } from 'react-bootstrap'

export default function Notifications({ messages }) {

    return (
        <Container className="notifications-board">
            <Container className="notifications-content">
                <ListGroup as="ul">
                    <h4>Notifications board</h4>
                    {messages && messages.map((message) => (
                        <ListGroup.Item as="li" className="notification" key={message}>
                            <p>{message}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </Container>
    )
}