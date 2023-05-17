import '../App.css';
import Card from 'react-bootstrap/Card';
import PriceTag from './PriceTag';
import BtnIcon from './BtnIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModel from './ConfirmModel';
import axios from 'axios';

function ProductCard(props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(props.item.selected)
  const [verify, setVerify] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  function oncartclick() {
    //alert("ok")
    setSelected(!selected)
    let selectedProducts = localStorage.getItem("selectedProducts");
    if (!selectedProducts) {
      selectedProducts = []
    }
    else {
      selectedProducts = JSON.parse(selectedProducts);
    }
    const id = props.item._id;
    const index = selectedProducts.indexOf(id);
    if (index === -1) {
      selectedProducts.push(props.item._id);

    }
    else {
      selectedProducts.splice(index, 1)
    }
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    setTimeout(() => {
      console.log(localStorage.getItem("selectedProducts"));
    }, 1000);
  }

  function onEdit(productId) {
    navigate('product/' + productId)
  }

  function onDelete(productId) {
    setVerify(true);
    setDeleteId(productId)
  }
  function onverifyClose(result) {
    if (!result) {
      setVerify(false);

      return
    }
    axios.delete("http://localhost:3001/products/" + deleteId)
      .then((res) => {
        setVerify(false);
        props.reload()
      })
      .catch((err) => {

      })
  }
  return (
    <>
      <Card className=' mb-5 mt-5 bg-light shadow sty'>
        <Card.Img className="itemImg" variant="top" src={props.item.image} />
        <Card.Body>
          <Card.Title className='text-muted'>{props.item.title}</Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
          <PriceTag price={props.item.price} />

          <div className="d-flex justify-content-between mt-2">
            <Card.Text className="flex-grow-1 text-truncate">
              <strong>Available:</strong> {props.item.available_qty}
            </Card.Text>
            <Card.Text className="flex-grow-1 text-truncate">
              <strong>Total:</strong> {props.item.total_qty}
            </Card.Text>
          </div>

          <div className="btn btn-outline-success w-100" role="group" aria-label="Basic example">
            {selected ? (
              <>
                <span className="me-2">Add to Cart</span>
                <BtnIcon icon="shopping_cart" onClick={oncartclick} className="btn btn-success" />
              </>
            ) : (
              <>
                <span className="me-2">Add to Cart</span>
                <BtnIcon icon="shopping_cart_checkout" onClick={oncartclick} className="btn btn-success" />
              </>
            )}
          </div>

          <div className='btn-group d-flex w-100 mt-2'>
            <button type="button" className="flex-grow-1 btn btn-outline-warning" onClick={() => onEdit(props.item._id)}>
              <BtnIcon icon='edit' /> EDIT
            </button>
            <button type="button" className="flex-grow-1 btn btn-outline-danger ms-3" onClick={() => onDelete(props.item._id)}>
              <BtnIcon icon='delete' /> DELETE
            </button>
          </div>


        </Card.Body>
      </Card>
      {verify ? <ConfirmModel onClose={onverifyClose} /> : ''}

    </>
  );
}

export default ProductCard;
