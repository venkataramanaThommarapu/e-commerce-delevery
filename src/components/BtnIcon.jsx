

function BtnIcon(props) {
  return (
    <>
   <button type="button" className="btn " onClick={props.onClick}><span className="material-icons">
            {props.icon}            
            </span></button>
    
    
    </>
  );
}

export default BtnIcon;
