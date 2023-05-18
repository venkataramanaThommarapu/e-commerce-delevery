import CartItem from "../components/CartItem";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from 'axios';
import { APIS } from "../apis";
import ConfirmModel from "./ConfirmModel";
import { toast } from "react-toastify";

function Cart(props) {
    const [data, setData] = useState([]);
    const [verify, setVerify] = useState(false);
    const [productId, setProductId] = useState("");

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        axios.get(APIS.CART_ITEMS)
            .then((response) => {
                let productIds = response.data.map(res => res.productId)
                axios.post(APIS.GET_CART_PRODUCTS, {productIds})
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        console.log("API call is completed");
                    });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("API call is completed");
            });
    }

    function onDeleteConfirm(itemId) {
        setProductId(itemId);
        setVerify(true);
    }

    function handleClose() {
        setVerify(false);
    }

    function onDelete() {
        axios
            .delete(APIS.DELETE_CART(productId))
            .then((response) => {
                console.log("Data deleted from the database:", response.data);
                toast.success("Item Successfully removed from the cart.", {theme: 'colored'})
                getProducts();
                handleClose();
                props.setReloadNavbar(Math.random());
            })
            .catch((error) => {
                console.error("Error deleting data from the database:", error);
            });
    }

    function renderCols() {
        return data.map((product, index) => (
            <Col md={4} lg={3} key={index}>
                <CartItem item={product} onDelete={() => { onDeleteConfirm(product._id) }} />
            </Col>
        ));
    }

    return (
        <>
            <Container>
                <Row>{renderCols()}</Row>
                {verify ? <ConfirmModel onClose={handleClose} onConfirm={onDelete} message="Are you sure do you wanna remove this item from the cart?" /> : ''}
            </Container>
        </>
    );
}

export default Cart;
