function PriceTag(props) {
  function formatePrice(price) {
    return parseFloat(price).toFixed(2);
  }
  return (
    <div className="d-flex align-items-center">
      <span className="material-icons-outlined mr-1">currency_rupee</span>
      <span className="font-weight-bold">{formatePrice(props.price)}</span>
    </div>
  );
}

export default PriceTag;
