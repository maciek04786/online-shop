import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext"

// styles & react-bootstrap
import './App.css';
import { Container } from 'react-bootstrap';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Item from './pages/product/Item';
import Signup from './pages/signup/Signup';
import User from './pages/user/User';
import Sell from './pages/sell/Sell';
import Cart from "./pages/cart/Cart"
import Checkout from './pages/checkout/Checkout';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Container fluid className="content p-0">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={(!user && <Login />) || <Navigate to="/" />}
              />
              <Route
                path="/item/:id"
                element={<Item />}
              />
              <Route
                path="/signup"
                element={(!user && <Signup />) || <Navigate to="/" />}
              />
              <Route
                path="/user/:id"
                element={(user && <User />) || <Navigate to="/login" />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="/checkout"
                element={<Checkout />}
              />
              <Route
                path="/sell"
                element={(user && <Sell />) || <Navigate to="/login" />}
              />
            </Routes>
            <Footer />
          </Container>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
