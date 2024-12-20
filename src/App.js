
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import NavScrollExample from './components/Navbar';
import CartState from './context/cartState';
import CreateProduct from './pages/CreateProduct';
import ProductList from './pages/Products';


function App() {
  return (
    <>
    <CartState>
    <Router>
      <NavScrollExample/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/product-list' element={<ProductList/>} />
        {/* if the page not found 404 optional*/}
        <Route path='*' element={<h1>Page not found</h1>}/>
      </Routes>
    </Router>
    </CartState>
    </>
  );
}

export default App;
