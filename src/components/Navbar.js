import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

// styles & bootstrap
import "./Navbar.css"
import { Cart4 } from 'react-bootstrap-icons'

import {
  Navbar, Nav, NavDropdown,
  Container, Button,
  Offcanvas
} from 'react-bootstrap'

export default function MyNavbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const navigate = useNavigate()

  const clickLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Navbar key={"md"} variant="dark" expand={"md"}>
      <Container fluid className="mx-5">
        <Navbar.Brand href="/">sellAnything.com</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"md"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
              sellAnything.com
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              {!user && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </>
              )}
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              {user && (
                <>
                  <NavDropdown
                    title="My Account"
                    id={`offcanvasNavbarDropdown-expand-${"md"}`}
                  >
                    <NavDropdown.Item href={`/user/${user.uid}`}>
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/sell">Sell</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={clickLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Button
          className="ms-4"
          variant="dark"
          href="/cart"
        ><Cart4 color="white" /></Button>
      </Container>
    </Navbar>
  )
}
