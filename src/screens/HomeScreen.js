import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
export default function HomeScreen(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userSignin = useSelector((state) => state.userSignin);
  const category = props.match.params.id ? props.match.params.id : '';
  const [sortOrder, setSortOrder] = useState('');
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const { userInfo } = userSignin;
  const [rating, setRating] = useState(0);
  const userTopSellersList = useSelector((state) => state.userTopSellersList);

  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts(category));
    dispatch(listTopSellers());
    // dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category,sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category,sortOrder));
  };


  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
            <>
              {sellers.length === 0 && <MessageBox>Không có người bán nào</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {sellers.map((seller) => (
                  <div key={seller._id}>

                    <Link to={`/seller/${seller._id}`}>
                      <img src={seller.seller.logo} alt={seller.seller.name} />
                      <p className="legend">{seller.seller.name}</p>
                    </Link>
                  </div>
                ))}
              </Carousel>
            </>
          )}
         
          {/* <span>Sắp xếp</span>{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="lowest">Giảm dần</option>
            <option value="highest">Tăng dần</option>
          </select> */}
          <li>
          <span>Sắp xếp</span>{' '}
          <select id="sortOrder" name="sortOrder" onChange={sortHandler}>
            <option value="lowest">Giảm dần</option>
            <option value="highest">Tăng dần</option>
          </select>
        </li>

       
      <h2>Sản phẩm nổi bật</h2>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <>
                {products.length === 0 && <MessageBox>Không có sản phẩm nào</MessageBox>}
                {category && <h2 className="nhapnho">{category}</h2>}
                <div className="wrapper">
                  <section className="row">
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
