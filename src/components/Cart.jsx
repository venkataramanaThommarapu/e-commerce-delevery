
import CartItem from "../components/CartItem"
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from 'axios';
import environment from "../environment";
function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        getProducts()
    }, [])

  
    function getProducts() {
        axios.get(`${environment.api}/products`) // Here we Fetching Data from Our Backend(mongodb)
            .then((response) => {
                console.log(response.data)
                const products = response.data.map((product) => {
                    product.selected = false;
                    return product;
                })
                // setProductas(products);
                // setData(products)
                const localData = localStorage.getItem("selectedProducts")
                console.log(localData)
                if (localData) {
                    let cartList = []
                    const modifiedData = JSON.parse(localData).map((product) => {
    
                        const filteredData = products.filter((eachItem) => {
                            if (eachItem._id === product) {
                                return {...eachItem,
                                    "selected" : true
                                }
                            }
                        })
                        cartList=[...cartList,...filteredData]
                        return filteredData
                        //console.log(filteredData)
    
                    })
                    setData(cartList)
                    console.log(cartList)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                console.log("Api call is completed")
            })
    }

    function reloadData(){
        getProducts()
    }


    function renderCols() {
        return data.map(function (product, index) {
            return (
                <Col md={4} lg={3} key={index}>
                    <CartItem item={product} reload={reloadData}/>

                </Col>
            )
        })
    }

    return (
        <>
            <Container>
                <Row>
                    {renderCols()}
                </Row>
            </Container>
        </>
    );
}

export default Home;
