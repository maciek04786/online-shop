import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'

// styles & bootstrap
import "./ItemDetails.css"
import { Container, Carousel, Card, Row, Col, Button, Modal } from 'react-bootstrap'

export default function ItemDetails({ item }) {
    const [show, setShow] = useState(false);
    const { user } = useAuthContext()
    const [showAddBtn, setShowAddBtn] = useState(true)
    const [showRemoveBtn, setShowRemoveBtn] = useState(true)
    const { data, addItem } = useLocalStorage("items")
    const { deleteDocument } = useFirestore("items")
    const { id } = useParams()
    const nav = useNavigate()

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

    // remove item from listing
    const handleRemove = () => {
        if (window.confirm("Are you sure?")) {
            deleteDocument(id)
            nav(`/user/${user.uid}`)
        }
    }

    /* Hiding "Add to cart" button if:
    - user not logged in
    - item already in cart
    - item sold by user */
    useEffect(() => {
        if (!user) {
            setShowAddBtn(false)
            setShowRemoveBtn(false)
        } else if (user.uid === item.sellerID) {
            setShowAddBtn(false)
            setShowRemoveBtn(true)
        }
        data.forEach((i) => {
            if (i.id === item.localStorageID) {
                setShowAddBtn(false)
            }
        })
    }, [data, item, user])

    return (
        <Container className="item-details-card">
            <Card border="secondary">
                <Card.Body>
                    <Card.Title as="h3" className="mb-5">{item.name}</Card.Title>
                    <Row>
                        <Col>
                            <p><strong>Price:</strong> <i>£{item.price}</i></p>
                            <p><strong>Condition:</strong> <i>{item.condition}</i></p>
                        </Col>
                        {showAddBtn && (
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
                        {showRemoveBtn && (
                            <Col>
                                <Button
                                    className=""
                                    onClick={handleRemove}
                                    variant="dark"
                                >
                                    Remove from listing
                                </Button>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col>
                            <p><strong>Description:</strong></p>
                            <p>{item.description}</p>
                        </Col>
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
                    <Button variant="primary" href="/cart" />
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
