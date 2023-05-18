import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrimaryNav from "./components/PrimaryNav";
import Home from './pages/Home';
import Product from "./pages/Product"
import NoPage from "./pages/NoPage";
import Cart from "./components/Cart"
import ProductDetails from "./pages/ProductsDetails";
import { ToastContainer } from 'react-toastify';

function App() {
  
 const[reloadNavbar, setReloadNavbar] = useState(Math.random())

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrimaryNav key={reloadNavbar}/>}>
            <Route index element={<Home  setReloadNavbar={setReloadNavbar}/>} />
            <Route path="product" element={<Product/>} />
            <Route path="cart" element={<Cart setReloadNavbar={setReloadNavbar}/>} />
            <Route path="products-details" element={<ProductDetails />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
