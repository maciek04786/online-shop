import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from "uuid"
import { storage } from "../../firebase/config"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from '../../hooks/useAuthContext'

// styles & bootstrap
import "./Sell.css"
import {
    Button, Card, Form,
    Row, Col, Spinner, InputGroup
} from 'react-bootstrap'

export default function Sell() {

    // form input fields
    const [name, setName] = useState("")
    const [condition, setCondition] = useState(null)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(null)
    const [files, setFiles] = useState(null)

    const [isPending, setIsPending] = useState(false)
    const [fileTypeError, setFileTypeError] = useState(null)
    const [uploadError, setUploadError] = useState(null)
    const { user } = useAuthContext()
    const { addDocument } = useFirestore("items")
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        setFiles(null)
        let selected = e.target.files

        // check if item photos have been added
        if (!selected) {
            console.log("no photos")
            setFileTypeError("Please select photo")
            return
        } else {

            // check file type
            Array.from(selected).forEach((file) => {
                if (!file.type.includes("image")) {
                    setFileTypeError("Selected file must be an image")
                    setFiles(null)
                    return
                } else {
                    setFileTypeError(null)
                    setFiles(selected)
                }
            })
        }
    }

    // add item for sale
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)

        const imagesFileNames = []

        const urls = []

        const itemID = uuid()

        // upload photos to firebase storage and store urls in database
        await Promise.all(Array.from(files).map(async (file) => {
            imagesFileNames.push(file.name)
            const storageRef = ref(storage, `/photos/${itemID}/${file.name}`)

            try {
                await uploadBytesResumable(storageRef, file)
                await getDownloadURL(storageRef)
                    .then((url) => {
                        urls.push(url)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
                setUploadError("Could not upload photos")
            }
        }))

        // add item doc to firebase db
        const newDoc = {
            localStorageID: uuid(),
            name,
            condition,
            description,
            price,
            photosURL: urls,
            sellerID: user.uid,
        }

        addDocument(newDoc, itemID)

        navigate(`/item/${itemID}`)
    }

    return (
        <Card className="sell-form">
            <Card.Body>
                <Card.Title className="mb-4" as="h3">
                    What would you like to sell?
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label>How would you name it?</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name item"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Row>
                            <Col sm={5}>
                                <Form.Label>Select condition of the item</Form.Label>
                            </Col>
                            <Col sm={6}>
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    onChange={(e) => setCondition(e.target.value)}
                                >
                                    <option>Choose condition</option>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                    <option
                                        value="For parts"
                                    >
                                        For parts
                                    </option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Describe the item</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={5}
                            placeholder="Try to include as many details as possible"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Row>
                            <Col sm={2}>
                                <Form.Label className="price-label">Set price</Form.Label>
                            </Col>
                            <Col sm={4}>
                                <InputGroup>
                                    <InputGroup.Text>£</InputGroup.Text>
                                    <Form.Control className="price-input"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        precision={2}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Label>Add photos</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    {uploadError && <div className="error">{uploadError}</div>}
                    {fileTypeError && <div className="error">{fileTypeError}</div>}
                    {isPending ? (
                        <Spinner animation="border" />
                    ) : (
                        <Button variant="dark" type="submit">List Item</Button>
                    )}
                </Form>
            </Card.Body>
        </Card>
    )
}
