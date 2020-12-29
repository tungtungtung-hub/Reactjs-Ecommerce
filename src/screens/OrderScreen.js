import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
        <div className="">
          <div className="font16">Đơn hàng</div>
          <div className="row top">
            <div className="">
              <ul>
                <li>
                  <div className="card1 card1-body">
                    <h2 className="text-center fontsize18 text-primary">Giao hàng</h2>
                    <p>
                      <strong>Tên:</strong> {order.shippingAddress.fullName} <br /><br></br>
                      <strong>Địa chỉ: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Đã giao hàng lúc:  {order.deliveredAt}
                      </MessageBox>
                    ) : (
                        <MessageBox variant="danger">Chờ giao hàng</MessageBox>
                      )}
                  </div>
                </li>
                <li>
                  <div className="card1 card1-body">
                    <h2 className="text-center fontsize18 text-primary">Thanh toán</h2>
                    <p>
                      <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Thanh toán tại: {order.paidAt}
                      </MessageBox>
                    ) : (
                        <MessageBox variant="danger">Chưa thanh toán</MessageBox>
                      )}
                  </div>
                </li>
                <li>
                  <div className="card1 card1-body">
                    <h2 className="text-center fontsize18 text-primary">Sản phẩm</h2>
                    <table className="table">
                      <thead>
                        <tr>
                         
                          <th>TÊN</th>     
                          <th>HÌNH ẢNH</th>                     
                          <th>SỐ LƯỢNG</th>
                          <th>GIÁ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={item.product}>
                            
                            <td >
                              <Link className="text-primary font16" to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </td>
                            <td> <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img></td>
                            <td>{item.qty}</td>
                            <td> {item.qty * item.price} $</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                </li>
              </ul>
            </div>

            <div className="col-1">

              <div className="card1 card1-body">

                <ul>
                  <li>
                    <h2 className="fontsize18 left">Chi tiết đơn hàng</h2>
                  </li>

                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Đơn hàng</th>
                        <th>Giá</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mặt hàng</td>
                        <td>{order.itemsPrice.toFixed(2)} $</td>

                      </tr>
                      <tr>
                        <td>Phí giao hàng</td>
                        <td>{order.shippingPrice.toFixed(2)} $</td>

                      </tr>
                      <tr>
                        <td>Thuế</td>
                        <td>{order.taxPrice.toFixed(2)} $</td>

                      </tr>
                      <tr>
                        <td>Tổng đơn hàng</td>
                        <td>{order.totalPrice.toFixed(2)} $</td>

                      </tr>
                      <tr>
                        <td>Thanh toán</td>
                        {!order.isPaid && (
                          <td className="small col-sm-2">
                            {!sdkReady ? (
                              <LoadingBox></LoadingBox>
                            ) : (
                                <>
                                  {errorPay && (
                                    <MessageBox variant="danger">{errorPay}</MessageBox>
                                  )}
                                  {loadingPay && <LoadingBox></LoadingBox>}


                                  <PayPalButton

                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}
                                  ></PayPalButton>
                                  <button className="btn btn-danger">Thanh toán momo</button>


                                </>
                              )}
                          </td>
                        )}
                      </tr>
                    </tbody>

                  </table>






                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      {errorDeliver && (
                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary block"
                        onClick={deliverHandler}
                      >
                        Giao hàng
                  </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
}
