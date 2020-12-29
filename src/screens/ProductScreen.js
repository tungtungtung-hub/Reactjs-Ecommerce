import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct,saveProductReview } from '../actions/productActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);

  
  const { userInfo } = userSignin;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const [category, setCategory] = useState('');
  // useEffect(() => {

  //   dispatch(detailsProduct(productId));
  // },
  
  // [dispatch, productId]);
  useEffect(() => {
    if (productSaveSuccess) {
      alert('Bạn đã Review thành công');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(productId));
    return () => {
      //
    };
  }, [productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(productId, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
           <a className="btn btn-primary" href="/">Trở về</a>

            {/* code */}
            
           {/* /// */}
           <div className="details thumbnail">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>            
            <div className="details-info">
              <ul>
                <li>
                
                  <h2 className="left ">{product.name} </h2>
                </li>
                <li>
                  
                 <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>                 
                </li>
                <li className="strong span thongsokithuat left">
                  <strong>Nhà sản xuất: <span>{product.brand}</span></strong>
                  <br></br>
                  <strong> Xuất xứ: </strong><span>Chính hãng</span>
                  <br></br>
                  <strong> Bảo hành: </strong><span>24 tháng</span>
                  <li>
                  <strong>Giá:</strong>  <span className="red"><b>{product.price} $ </b></span>
                  </li>
                </li>
                  <li className="strong span"></li>
                    <div className="nk-top-stickers">
                      <span className="nk-sticker nk-installment">Trả góp 0%</span>
                      <span className="nk-sticker nk-new">Mới 100%</span>
                    </div>   
                    <div class="popup_click_buy popup_click_buy-96836" >
                      <div class="wrap_popup_click_buy wrap_popup_click_buy-96836"></div>
                    </div>     
                    <div className="product_info_buttons btn-2 " id="buy_button_area">
                      <div className="btn btn_buyNow btn-buy-now-click s-flag old_checkout_start btn-shake" onClick={addToCartHandler}><span className="txt-main old_checkout_start ">THÊM VÀO GIỎ</span><span className="txt-sub old_checkout_start">Giao hàng tận nơi</span><input style={{display: 'none'}} defaultValue="CHO VÀO GIỎ HÀNG" className="btn-add2cart-inn old_checkout_start" type="submit" name="dispatch[checkout.add2..96836]" id="button_cart_96836" /></div>
                      <div className="btn btn_traGop btn-tra-gop-click s-flag" style={{}}><span className="txt-main">MUA TRẢ GÓP</span><span className="txt-sub">Chỉ có 1.923.333đ/tháng (6 tháng)</span><input style={{display: 'none'}} type="submit" name="dispatch[nk_tragop_hd.installment..96836]" id="button_tragop_96836" /></div>
                    </div>               
                <li className="left">
                  <br></br>
                  <strong className="red left fontsize28">Mô tả sản phẩm:</strong>
                  <br></br>
                  <br></br>
                  <div className="description text-defaut">{product.description}</div>                   
                </li>
              </ul>
            </div>
            <div className="details-action left">
              <ul>
              <li>
                    Người bán:{' '}                     
                   
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                        
                      </Link>                  
                  </li>
                <li>Giá: {product.price}  $</li>
                <li>
                  Trạng thái:
                      
                        {product.countInStock > 0 ? (
                          <span className="success">Trong kho</span>
                        ) : (
                          <span className="danger">Không có sẵn</span>
                        )}                         
                </li>
                <li>
                  Số lượng:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li >
                  {product.countInStock > 0 && (
                    <button
                      onClick={addToCartHandler}
                      className="btn btn-primary"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  )}
                </li>
              </ul>
              
            </div>
            
          </div>

          
          <div className="content-margined">
           {!product.reviews.length && <div>Không có bình luận nào</div>}
          {product.reviews.map((review) => (
                <ul key={review._id}>
                  <div>{review.name}: {review.createdAt.substring(0, 10)}</div>
                  
                  
                  <div>{review.comment}</div>
                </ul>
              ))}
                <h3>Nhận xét của khách hàng</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container1">
                      <li>
                        <label htmlFor="rating">Đánh giá</label>
                        
                        <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value="1">1- Quá tệ</option>
                          <option value="2">2- Tệ</option>
                          <option value="3">3- Vừa</option>
                          <option value="4">4- Tốt</option>
                          <option value="5">5- Rất tốt</option>
                        </select>
                       
                       
                        
                      </li>
                      <li>
                        <label htmlFor="comment">Bình luận</label>
                        <textarea className="binhluan"
                          name="comment"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="btn btn-primary col-sm-2">
                          Đăng
                        </button>
                      </li>
                    </ul>
                    
                  </form>
                  
                ) : (
                  <div>
                    Vui lòng <Link to="/signin">Đăng nhập</Link> Để bình luận.
                  </div>
                )}
          <div className="fb-comments" data-href="https://www.facebook.com/100122195229869/photos/a.100122331896522/100122315229857" data-numposts="5" data-width=""></div>
          </div>
        </div>
        
      )}
    </div>
  );
}
