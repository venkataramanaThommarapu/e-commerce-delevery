import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import environment from "../environment";
import '../App.css';

const MyTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${environment.api}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle edit and delete actions
  const handleEdit = (productId) => {
    // Perform edit action
    console.log('Edit product:', productId);
  };

  const handleDelete = (productId) => {
    // Perform delete action
    console.log('Delete product:', productId);
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center text-primary mb-3'>Shopify Data</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Available Qty</th>
            <th>Total Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.available_qty}</td>
              <td>{product.total_qty}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyTable;
