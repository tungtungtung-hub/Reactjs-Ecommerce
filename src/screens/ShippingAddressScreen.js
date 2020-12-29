import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form-horizontal" onSubmit={submitHandler}>
        <div className="text-center font24 text-primary">
          Địa chỉ giao hàng
        </div>
        <div className="">


          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="fullName">Họ và tên:</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="text"
                id="fullName"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="address">Địa chỉ:</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="city">Thành phố:</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="postalCode">Mã bưu điện:</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="country">Đất nước:</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="text"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-2" >

              <button className="btn btn-primary" type="submit">
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
