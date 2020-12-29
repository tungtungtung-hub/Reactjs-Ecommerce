import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div className="text-center fontsize26">
          Phương thức thanh toán
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal"> &nbsp; PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="Momo"
              value="Momo"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="Momo"> &nbsp; Momo</label>
          </div>
        </div>
        <div>
         
          <div>
            <input
              type="radio"
              id="tienmat"
              value="tienmat"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="tienmat"> &nbsp; Tiền mặt</label>
          </div>
        </div>


        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-4" >

            <button className="btn btn-primary" type="submit">
              Tiếp tục
              </button>
          </div>
        </div>

      </form>
    </div>
  );
}
