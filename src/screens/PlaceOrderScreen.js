import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(0);
  cart.taxPrice = toPrice(0.01 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="">
        <div className="">
          <ul>
            <li>
              <div class="">
                <div className="card1 card1-body">
                  <h2 className="text-center fontsize20 text-primary">Giao hàng</h2>
                   <div className=""><strong>Tên:</strong> {cart.shippingAddress.fullName}</div> 
                  <p>
                    
                     
                    <br></br>
                    <strong>Địa chỉ: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="">
                <div className="card1 card1-body">
                  <div className="text-center fontsize20 text-primary">Thanh toán</div>
                  <p>
                    <strong>Phương thức thanh toán:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>

            </li>
            <li>
              <div className="">
                <div className="card1 card1-body">
                  <h2 className="text-center fontsize20 text-primary">Đơn hàng</h2>
                  <table className="table">
                    <thead className="text-center">
                      <tr className="text-center info">                        
                        <th>TÊN</th>
                        <th>HÌNH ẢNH</th>
                        <th>SỐ LƯỢNG</th>
                        <th>GIÁ</th>
                        <th>TỔNG TIỀN</th>

                      </tr>
                    </thead>
                    <tbody>
                      {cart.cartItems.map((item) => (

                        <tr key={item.product}>
                          <td>
                            <Link className="font16 text-primary" to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td className="text-center"> <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img></td>

                          <td>{item.qty}</td>
                          <td> {item.price.toFixed(2)} $ </td>
                          <td>{(item.qty * item.price).toFixed(2)} $</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>

            </li>
          </ul>
        </div>
        <div className="">
<br></br>
          <div className="card1 card1-body">
            <table class="table table-bordered  ">
              
                <tr className="font20 text-primary  ">
                  <tr><tr><th ><th>Chi tiết đơn hàng</th></th></tr>  </tr>

                  
                  {/* <th><th >Chi tiết đơn hàng</th></th> */}

                </tr>
             
              <tbody>
                <tr>
                  <td>Đơn hàng</td>
                  <td>{cart.itemsPrice.toFixed(2)} $</td>

                </tr>
                <tr>
                  <td>Phí giao hàng</td>
                  <td>{cart.shippingPrice.toFixed(2)} $</td>

                </tr>
                <tr>
                  <td>Thuế</td>
                  <td>{cart.taxPrice.toFixed(2)} $</td>

                </tr>
                <tr>
                  <td>Tổng</td>
                  <td>{cart.totalPrice.toFixed(2)} $</td>


                </tr>
                <tr>
                  <td></td>
                  <td className="text-center">
                  <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btn btn-primary "
                  disabled={cart.cartItems.length === 0}
                >
                  Đặt hàng
                </button>
                {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
                  </td>
                </tr>
              </tbody>
            </table>
            <ul>



              <li>
                
              </li>
              
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
