
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import NavScrollExample from './components/Navbar';
import CartState from './context/cartState';
import CreateProduct from './pages/Creationprod';
import ProductList from './pages/Products';
import TabComp from './components/TabComp'
import Productscard from './pages/Productscard';
import Deleteprod from './pages/Deleteprod';

function App() {
  return (
    <>
      <CartState>
        <Router>
          <NavScrollExample />
          <TabComp />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/create-product' element={<CreateProduct />} />
            <Route path='/product-list' element={<ProductList />} />
            <Route path='/product-cards' element={<Productscard />} />
            <Route path='/delete-prod' element={<Deleteprod />} />
            {/* if the page not found 404 optional*/}
            <Route path='*' element={<h1>Page not found</h1>} />
          </Routes>
        </Router>
      </CartState>
    </>
  );
}

export default App;
