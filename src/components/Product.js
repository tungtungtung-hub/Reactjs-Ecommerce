import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  
  return (

    <div
      key={product._id}>

      <div className="container-item" >
        <div className="item">
          <div className="item-overlay">
            <a href="#" className="item-button info"><i className="fa fa-info" /></a>
            <a href="#" className="item-button share share-btn">
              <i className="fa fa-share-alt" /></a>
            <div className="sale-tag"><span>MỚI</span></div>
            <div className="product-rating">

              <div className="panel-footer"> <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating></div>


            </div>
          </div>
          {/* item image */}
          <div className="item-img">
            <Link to={'/product/' + product._id}>
              <img className="product-image " src={product.image} alt="product" />
            </Link>
          </div>
          {/* end item image */}
          <div className="item-content">
            <div className="item-top-content">
              <div className="item-top-content-inner">
                <div className="item-product">
                  <div className="item-top-title ">
                    <Link className="font14 text-primary" to={'/product/' + product._id}>{product.name}</Link>

                    <p className="subdescription">{product.brand}</p>
                  </div>
                </div>
                <div className="item-product-price">
                  <span className="price-num"> {product.price} $</span>
                </div>
              </div>
            </div>
            <div className="item-add-content">
              <div className="item-add-content-inner">
                {/* <div className="section">
                     <h4>Sizes</h4>
                     <p>40,41,42,43,44,45</p>
                   </div>  */}
                <div className="section center">
                  <Link className="btn buy" to={'/product/' + product._id}>Xem Thêm  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <div className="row">
          <div className="col-sm-3">
            <div className="panel panel-primary">


              <Link to={`/product/${product._id}`}><img src={product.image} className=" img-center" style={{ width: '30%' }} alt={product.name} /></Link>

              <Link to={`/product/${product._id}`}>          <h2>{product.name}</h2>         </Link>

              <div className="subdescription">{product.brand} </div>
              <div className="price">{product.price} $</div>
              <div>
                <Link to={`/seller/${product.seller._id}`}>
                  {product.seller.name}
                </Link>
              </div>


              <div className="panel-footer"> <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating></div>
            </div>
          </div>

        </div> */}



    </div>

  );
}
