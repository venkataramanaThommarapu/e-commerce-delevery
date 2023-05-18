import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import environment from "../environment";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import ConfirmModel from '../components/ConfirmModel';
import { toast } from 'react-toastify';
import { APIS } from '../apis';


const ProductDetails = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [verify, setVerify] = useState(false);
  const [deleteId, setDeleteId] = useState('')

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

  function onDelete(productId) {
    setVerify(true);
    setDeleteId(productId)
  }

  function confirmDelete() {
    axios.delete(APIS.DELETE_PRODUCT(deleteId))
      .then((res) => {
        setVerify(false);
        toast.success("Product Deleted Successfully!", { theme: "colored" });
        fetchData();
      })
      .catch((err) => {
        console.log(err)
        toast.error("Product Deleting failed!", { theme: "colored" });
      })
  }

  function handleClose() {
    setVerify(false);
  }

  return (
    <div className='container product-details '>
      <h2 className='text-center text-primary mb-3'>Shopify Products Data</h2>
      <div className='card shadow-lg'>
        <Table striped bordered hover >
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
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.available_qty}</td>
                <td>{product.total_qty}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate(`/product/${product._id}`)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(product._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {verify ? <ConfirmModel onClose={handleClose} onConfirm={confirmDelete} message="Are you sure do you wanna delete this record?" /> : ''}

    </div>
  );
};

export default ProductDetails;
