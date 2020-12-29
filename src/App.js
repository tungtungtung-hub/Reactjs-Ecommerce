import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ContactUs from './components/ContactForm';
import Login from './screens/login';
import Media from 'react-media';
import { useMediaQuery } from 'react-responsive'
// import Blog from './components/Blog'

import BlogScreen from './screens/BlogScreen';

// import 'bootstrap/dist/css/bootstrap.min.css'; 
import MessengerCustomerChat from 'react-messenger-customer-chat';
function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>

      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Logo</a>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
              <li class="active"><a href="/">Home</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Thể loại <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="/category/Chuột Gaming">Chuột Gaming</a></li>
                  <li><a href="/category/Laptop Gaming">Laptop Gaming</a></li>


                </ul>
              </li>

              <li><a href="#">Deals</a></li>
              <li><a href="/BlogScreen">Tin tức</a></li>
              <li><a href="/ContastUs">Liên hệ</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right ">

              <li className="top">
                <Route
                  render={({ history }) => (
                    <SearchBox history={history}></SearchBox>
                  )}
                ></Route>
              </li>
              <li className="top2"><Link to="/cart">
                <span class="glyphicon glyphicon-shopping-cart"></span> Giỏ hàng
              {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}  </span>
                )}
              </Link></li>

              {userInfo ? (
                <li class="dropdown top1">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{userInfo.name} <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="/profile">Cài đặt</a></li>
                    <li><a href="/orderhistory">Đơn hàng</a></li>
                    <li> <Link to="#signout" onClick={signoutHandler}>Đăng xuất </Link></li>

                  </ul>
                </li>
              ) : (
                  <li className="top3"><Link to="/signin">Đăng nhập</Link></li>
                )}
              {userInfo && userInfo.isSeller && (
                <li class="dropdown top1">
                  <a href="#admin" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">seller <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li>
                      <Link to="/productlist/seller">Sản phẩm</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Đơn hàng</Link>
                    </li>
                    <li>

                    </li>
                  </ul>
                </li>
              )}
              {userInfo && userInfo.isAdmin && (

                <li class="dropdown top1">
                  <a href="#admin" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li>
                      <Link to="/productlist">Sản phẩm</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Đơn hàng</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Người dùng</Link>
                    </li>

                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>


      </nav>

      <div>


        <div className="content-container">
          <main>
            <Route path="/seller/:id" component={SellerScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
            <Route path="/ContastUs" component={ContactUs} />
            <Route path="/BlogScreen" component={BlogScreen} />
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
            <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
              exact
            ></AdminRoute>
            <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <SellerRoute
              path="/productlist/seller"
              component={ProductListScreen}
            ></SellerRoute>
            <SellerRoute
              path="/orderlist/seller"
              component={OrderListScreen}
            ></SellerRoute>

            <Route path="/" component={HomeScreen} exact></Route>
          </main>

        </div>

      </div>
      <footer className="center">@copyright 2020</footer>



      <div >
        <MessengerCustomerChat
          pageId="100122195229869"
          appId="375883420391506"
        />,
                   </div>

    </BrowserRouter>
  );
}

export default App;
