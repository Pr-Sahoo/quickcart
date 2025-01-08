
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import NavScrollExample from './components/Navbar';
import CartState from './context/cartState';
import CreateProduct from './pages/Creationprod';
import ProductList from './pages/Products';
// import TabComp from './components/TabComp'
import Productscard from './pages/Productscard';
import Deleteprod from './pages/Deleteprod';
import Page from './pages/Page';
import { BasketProvider } from './context/BasketContext';
import AllOrders from './pages/AllOrders';
import AuthPage from './pages/AuthPage';
import Footer from './pages/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <CartState>
        <BasketProvider>
          <Router>
            <NavScrollExample />
            {/* <TabComp /> */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/create-product' element={<CreateProduct />} />
              <Route path='/product-list' element={<ProductList />} />
              <Route path='/product-cards' element={<Productscard />} />
              <Route path='/delete-prod' element={<Deleteprod />} />
              <Route path='/page' element={<Page />} />
              <Route path='/all-orders' element={<AllOrders/>} />
              <Route path='/auth-page' element={<AuthPage/>} />
              <Route path='/sign-up' element={<SignUp/>} />
              <Route path='/login' element={<Login />} />
              {/* if the page not found 404 optional*/}
              <Route path='*' element={<h1>Page not found</h1>} />
            </Routes>
            <Footer />
          </Router>
        </BasketProvider>
      </CartState>
    </>
  );
}

export default App;
