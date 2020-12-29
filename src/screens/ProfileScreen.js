import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không đúng');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };
  return (
    <div className="container">
      <form className="form-horizontal" onSubmit={submitHandler}>
        <div className="text-center fontsize26 text-primary">
          Thông tin người dùng
        </div>
        <br></br>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                  <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && (
                  <MessageBox variant="success">
                    Hồ sơ được cập nhật thành công
                  </MessageBox>
                )}
                <div className="container">


                  <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="name">Tên:</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>

                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="password">Mật khẩu:</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        id="confirmPassword"
                        type="password"
                        placeholder="xác nhận mật khẩu"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  {user.isSeller && (
                    <>
                      <div className="text-center font24 text-primary">Người bán</div>
                      <br></br>
                      <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="sellerName">Tên người bán</label>
                        <div className="col-sm-8">
                          <input
                            className="form-control"
                            id="sellerName"
                            type="text"
                            placeholder="Nhập tên người bán"
                            value={sellerName}
                            onChange={(e) => setSellerName(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="sellerLogo">Logo Người bán:</label>
                        <div className="col-sm-8">
                          <input
                            className="form-control"
                            id="sellerLogo"
                            type="text"
                            placeholder="url logo"
                            value={sellerLogo}
                            onChange={(e) => setSellerLogo(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="control-label col-sm-3">
                          <img className="small" src={user.seller.logo} alt={user.seller.name}></img>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="sellerDescription">Mô tả:</label>
                        <div className="col-sm-8">
                          <textarea
                            className="form-control"
                            id="sellerDescription"
                            type="text"
                            rows="5"
                            placeholder="Nhập mô tả"
                            value={sellerDescription}
                            onChange={(e) => setSellerDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-sm-offset-2 col-sm-8" >

                    <button className="btn btn-primary" type="submit">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </>
            )}
      </form>
    </div>
  );
}
