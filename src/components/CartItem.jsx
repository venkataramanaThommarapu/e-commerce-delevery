import '../App.css';
import Card from 'react-bootstrap/Card';
import PriceTag from './PriceTag';


function CartItem(props) {  

  return (
    <>
      <Card className='mb-4 bg-light shadow cart-card'>
        <Card.Img className="product-card-img" variant="top" src={props.item.image} />
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Text>{props.item.description}</Card.Text>
          <PriceTag price={props.item.price} />
          <div className='btn-group w-100'>
            <button
              className="btn btn-danger mt-2"
              onClick={props.onDelete}
            >
              <i className="bi bi-trash-fill fs-5 d-flex justify-content-center"></i>
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CartItem;
