import { useState, useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// styles & bootstrap
import "./Cart.css"
import { Container, Button, ListGroup } from 'react-bootstrap'

export default function Cart() {
    const [totalPrice, setTotalPrice] = useState(0)
    const { data, deleteItem, clearData } = useLocalStorage("items")

    // update total price
    useEffect(() => {
    let total = 0

    data.forEach((item) => {
    total += parseFloat(item.price)
    })

    setTotalPrice(total)
  }, [data])

    return (
        <Container className="mt-5 cart-body shopping-cart">
            <ListGroup as="ol" variant="flush">
                <h1 className="mb-4">Items in cart</h1>
                {data && data.map((item) => (
                    <ListGroup.Item
                    key={item.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.name}</div>
                        Price: £{item.price}
                    </div>
                    <Button
                        className="mt-2"
                        size="sm"
                        variant="dark"
                        onClick={() => deleteItem(item.id)}
                    >X</Button>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item className="my-4">
                    <h3>Total: £{totalPrice}</h3>
                </ListGroup.Item>
            </ListGroup>
            <Button
                variant="dark"
            >Checkout</Button>
            <Button 
                variant="dark" 
                href="/" 
                className="me-1"
            >Back</Button>
            <Button
                onClick={clearData}
                variant="dark" 
                className="clear-btn"
            >Clear all</Button>
        </Container>
    )
}
