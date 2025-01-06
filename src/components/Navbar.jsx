import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import AuthPage from '../pages/AuthPage';
import { Link,  useNavigate } from 'react-router-dom';

function NavScrollExample() {
    const navigate = useNavigate();
    return (
        <Navbar expand="lg" bg='dark' data-bs-theme='dark' className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">Quick Cart</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link href="/page">Cart<i class="fa-solid fa-cart-shopping"></i></Nav.Link>
                        <Nav.Link as={Link} to="/create-product">Create Product</Nav.Link>
                        <Nav.Link as={Link} to="/delete-prod">Delete Product</Nav.Link>
                        <NavDropdown title="Management" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/product-list">
                                Product List
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/create-product">Product Creation</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/cart-manage">
                                Electronics and Accessories
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex mx-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Button variant="outline-primary" className='ms-3' onClick={() => navigate("/auth-page")}>Login</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;