
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import { useEffect,useState } from "react";
import environment from "../environment";
import Footer from"../components/Footer";


function Home() {
const [products,setProductas] = useState([])
const [data , setData] = useState([])
useEffect(()=>{
  getProducts()
},[])



function getProducts() {
  axios.get(`${environment.api}/products`)
    .then((response) => {
      const res = response.data;
      console.log(res);
      const products = res.map((product) => {
        product.selected = false;
        return product;
      });
      setProductas(products);
      setData(products);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Api call is completed");
    });
}


function onSearched(term){
  console.log(term)
  if(!term){
    setProductas(data);
    return
  }
  const filtered = data.filter((item)=>{
    const titleLowerCased = item.title.toLowerCase();
    const termLowerCased = term.toLowerCase();
    return titleLowerCased.indexOf(termLowerCased)!==-1
  })
  setProductas(filtered)
}


function renderCols() {
  return products.map(function (product,index) {
    return (
  
    <Col md={4} lg={3} key={index}>
    <ProductCard item={product} reload={getProducts}/>
    </Col>
     
    )
  })
}

  return (
   <>
   
   <Search onSearch={onSearched}/>


   <Container>
    <Row>
    {renderCols()}  
    </Row>   
   </Container>
   <div>
    < Footer />
   </div>
   </>
  );
}

export default Home;
