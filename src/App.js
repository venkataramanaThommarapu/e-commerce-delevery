
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import PrimaryNav from "./components/PrimaryNav";
import Home from './pages/Home';
import Product from "./pages/Product"
import NoPage from "./pages/NoPage";
import Cart from "./components/Cart"
import Products_details from "./pages/Products_details";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrimaryNav />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products_details" element={<Products_details />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
