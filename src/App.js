import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import OrderReview from './components/OrderReview/OrderReview';
import AddProduct from './components/AddProduct/AddProduct';
import Login from './components/Login/Login';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import AuthProvider from './Context/AuthProvider';
import Register from './components/Register/Register';

function App() {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path='/review'>
              <OrderReview></OrderReview>
            </Route>
            <Route path='/addProduct'>
              <AddProduct></AddProduct>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/productDetails/:id'>
              <ProductDetails></ProductDetails>
            </Route>
            <Route path='/placeOrder'>
              <PlaceOrder></PlaceOrder>
            </Route>
            <Route path='/register'>
              <Register></Register>
            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
