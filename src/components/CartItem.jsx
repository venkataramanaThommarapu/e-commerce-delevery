import '../App.css';
import Card from 'react-bootstrap/Card';
import PriceTag from './PriceTag';
import BtnIcon from './BtnIcon';
function CartItem(props) {
  function onDelete(productId) {
     let localData=localStorage.getItem("selectedProducts")
     if(localData){
      let filteredCart=JSON.parse(localData).filter((each)=>{
        return each!==productId
      })
      localStorage.setItem("selectedProducts", JSON.stringify(filteredCart));
      props.reload()
     }
  }
 
  return (
    <>
      <Card className='mb-4 bg-light shadow mt-5' >
        <Card.Img className="itemImg" variant="top" src={props.item.image} />
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
          <PriceTag price={props.item.price} />
          <div className='btn-group w-100 '>
            <BtnIcon icon='delete' onClick={() => (onDelete(props.item._id))} />
          </div>

        </Card.Body>
      </Card>
    </>
  );
}

export default CartItem;
