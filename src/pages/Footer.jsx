import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-4 mt-5'>
      <Container>
        <Row>
          {/* Company info */}
          <Col md={4} className='mb-3'>
            <h5>Quick Cart</h5>
            <p>Your one-stop shop for everything</p>
            <p>&copy; {new Date().getFullYear()} Quick Cart. All rights reserved.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className='mb-3'>
            <h5>Quick Links</h5>
            <ListGroup variant='flush'>
              <ListGroup.Item className='bg-dark border-0'>
                <a href="/" className='text-white text-decoration-none'>Home</a>
              </ListGroup.Item>
              <ListGroup.Item className='bg-dark border-0'>
                <a href="/about" className='text-white text-decoration-none'>About</a>
              </ListGroup.Item>
              <ListGroup.Item className='bg-dark border-0'>
                <a href="/product-list" className='text-white text-decoration-none'>Product List</a>
              </ListGroup.Item>
              <ListGroup.Item className='bg-dark border-0'>
                <a href="/contact" className='text-white text-decoration-none'>Contact</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/* Contact info */}
        <Col md={4} className='mb-3'>
          <h5>Contact Us</h5>
          <p>Email: pranayaranjan4@gmail.com</p>
          <p>Phone: 8260675755</p>
          <p>Adress: Nandan vihar, patia, Bhubaneswar</p>
        </Col>

        <hr className='my-3' />

        {/* Social media links */}
        <Row className='text-center'>
          <Col>
            <Button variant='link' href='https://www.linkedin.com/in/pr-s-35862722b/' target='_blank' rel='noopener noreferrer' className='text-white me-3'>
              <FaLinkedin size={30} />
            </Button>
            <Button variant='link' href='https://github.com/Pr-Sahoo' target='_blank' rel='noopener noreferrer' className='text-white me-3'>
              <FaGithub size={30} />
            </Button>
            <Button variant='link' href='https://x.com/pranayaranjan49' target='_blank' rel='noopener noreferrer' className='text-white me-3'>
              <FaTwitter size={30} />
            </Button>
            <Button variant='link' className='text-white me-3'>
              <FaInstagram size={30} />
            </Button>
            <Button variant='link' className='text-white me-3'>
              <FaFacebook size={30} />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;