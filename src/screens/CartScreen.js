import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';
import $ from 'jquery';
export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  $(document).ready(function(){
    $("p").click(function(){
      $(this).hide();
    });
  });
  return (


    <div className="">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {cartItems.map((item) => (
        <div className="table">
         
               <p> <MessageBox variant="success">{item.name} đã được thêm vào giỏ hàng
               </MessageBox>  </p>
        </div>
      ))}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th >TÊN</th>
            <th>HÌNH SẢN PHẨM</th>
            <th>SỐ LƯỢNG</th>
            <th>GIÁ</th>
            <th>HOẠT ĐỘNG</th>
          </tr>
        </thead>
        <tbody className="">
          {cartItems.map((item) => (
            <tr key={item.product}>
              <td><Link className="text-primary font16" to={`/product/${item.product}`}>{item.name}</Link></td>
              <td><img src={item.image} alt={item.name} className="small img-responsive imgcenter" ></img></td>

              <td><select
                value={item.qty}
                onChange={(e) =>
                  dispatch(
                    addToCart(item.product, Number(e.target.value))
                  )
                }
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select></td>
              <td>{item.price} $</td>
              <td><button className="btn btn-danger col-sm-3 text-center"
                type="button"
                onClick={() => removeFromCartHandler(item.product)}>
                Xóa
                    </button></td>
            </tr>
          ))}
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>

            <th>Tổng ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                        {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} $</th>

            <button type="button" onClick={checkoutHandler} className="btn btn-primary col-sm-7" disabled={cartItems.length === 0}>Kiểm tra đơn hàng</button>
          </th>
          <tr>
            {cartItems.length === 0 ? (
              <MessageBox>
                Giỏ hàng trống. <Link className="text-primary font16" to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                    </li>
                  ))}
                </ul>
              )}
          </tr>
        </tbody>
      </table>
      <div className="">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <>
                {products.length === 0 && <MessageBox>Không có sản phẩm nào</MessageBox>}

                <div className="wrapper">
                  <section className="row">
                    <div className="text-primary font20">Sản phẩm liên quan</div>
                    {products.map((product) => (
                      <Product key={product._id} product={product}></Product>

                    ))}
                  </section>

                </div>
              </>
            )}
      </div>


    </div>

  );
}
