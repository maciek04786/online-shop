import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// styles & bootstrap
import "./ItemDetails.css"
import { Container, Carousel, Card, Row, Col, Button, Modal } from 'react-bootstrap'

export default function ItemDetails({ item }) {
    const [show, setShow] = useState(false);
    const { user } = useAuthContext()
    const [showButton, setShowButton] = useState(true)
    const { data, addItem } = useLocalStorage("items")

    // handle added item info modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // add item to cart
    const handleAdd = async () => {

        const newItem = {
            id: item.localStorageID,
            name: item.name,
            price: item.price
        }
        addItem(newItem)
        handleShow()
    }

    /* Hiding "Add to cart" button if:
    - user not logged in
    - item already in cart
    - item sold by user */
    useEffect(() => {
        if (!user) {
            setShowButton(false)
        } else if (user.uid === item.sellerID) {
            setShowButton(false)
        }
        data.forEach((i) => {
            if (i.id === item.localStorageID) {
                setShowButton(false)
            }
        })
    }, [data, item, user])

    return (
        <Container className="mt-5 mb-3 item-details-card">
            <Card border="success">
                <Card.Body>
                    <Card.Title as="h3" className="mb-4">{item.name}</Card.Title>
                    <Row>
                        <Col sm={8}>
                            <p><strong>Price:</strong> £{item.price}</p>
                            <p><strong>Condition:</strong> {item.condition}</p>
                            <p><strong>Description:</strong></p>
                            <p>{item.description}</p>
                        </Col>
                        {showButton && (
                            <Col>
                                <Button
                                className=""
                                onClick={handleAdd}
                                variant="dark"
                            >
                                Add to cart
                            </Button>
                        </Col>
                        )}
                    </Row>
                    <Carousel className="mt-3" interval={null}>
                        {item.photosURL.map((url) => (
                            <Carousel.Item key={url}>
                                <img
                                    className="d-block w-100"
                                    src={url}
                                    alt=""
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><strong>Item added to cart</strong></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" href="/cart">
                    Go to cart
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
