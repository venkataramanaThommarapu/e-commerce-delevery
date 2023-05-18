import environment from "./environment";


export const APIS = {

    //Products
    PRODUCTS: environment.api+ "/products", //GET
    ADD_PRODUCTS: environment.api+ "/products", //POST
    DELETE_PRODUCT:(id)=> `${environment.api}/products/${id}`, //DELETE
    EDIT_PRODUCT:(id)=> `${environment.api}/products/${id}`, //PUT
    GET_CART_PRODUCTS:`${environment.api}/products/cart`, //GET
   
     
    //Cart
    CART_ITEMS: environment.api+ "/cart",//GET
    ADD_CART: environment.api+ "/cart", //POST
    DELETE_CART:(id)=> `${environment.api}/cart/${id}`,//DELETE
    GET_CART_COUNT:`${environment.api}/cart/count`,//GET
   

}