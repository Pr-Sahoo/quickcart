import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import AuthPage from '../pages/AuthPage';
import { Link,  useNavigate } from 'react-router-dom';

function NavScrollExample() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false); // track if the user is new
    const navigate = useNavigate();

    //Check Authentication status on mount
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        setIsAuthenticated(!!token);
    },[]);

    //Handle Logout
    const handleLogOut = () => {
        localStorage.removeItem("auth-token");
        setIsAuthenticated(false);
        setIsNewUser(false);
        navigate("/");
    };

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
                        <Nav.Link as={Link} to="/page">Cart<i className="fa-solid fa-cart-shopping"></i></Nav.Link>
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
                    {/* <Button variant="outline-primary" className='ms-3' onClick={() => navigate("/auth-page")}>Login</Button> */}

                    {/* Conditional redering of buttons */}
                    {!isAuthenticated && !isNewUser  && (
                        <>
                        <Button variant='outline-primary' className='ms-3' onClick={() => navigate("/auth-page")}>Login</Button>
                        <Button variant='outline-secondary' className='ms-3' onClick={() => setIsNewUser(true)}>SignUp</Button> 
                        </>
                    )}

                    {isNewUser && (
                        <Button variant='outline-secondary' className='ms-3' onClick={() => navigate("/sign-up")}>SignUp</Button>
                    )}

                    {isAuthenticated && (
                        <Button variant='outline-danger' className='ms-3' onClick={handleLogOut}>LogOut</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;