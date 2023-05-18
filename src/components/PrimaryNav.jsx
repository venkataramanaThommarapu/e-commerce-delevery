import { Outlet, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Brand from './Brand';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIS } from "../apis";

function PrimaryNav() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(APIS.GET_CART_COUNT);
      const count = response.data;
      setSelected(count);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Brand />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate('/')}> <strong>Home</strong></Nav.Link>
              <Nav.Link onClick={() => navigate('/Product')} className="ms-3"><strong>Add Product</strong></Nav.Link>
              <Nav.Link onClick={() => navigate('/products-details')} className="ms-3"><strong>Products details</strong></Nav.Link>
              <Nav.Link onClick={() => navigate('/cart')} className='position-relative ms-3'>
               <i className="bi bi-cart-fill"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {selected}
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default PrimaryNav;
