import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: 'url("../bg-01.jpg")' }}>

                <div className="wrap-login100">
                    <form className="login100-form" onSubmit={submitHandler}>
                        <div className="text-center text-primary font24">
                            Đăng nhập
                         </div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}


                        <div className="">
                            <div className="p-t-31 p-b-9">
                                <span className="txt1">
                                    Email
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Username is required">
                                <input className="input100" type="text" name="email" id="email"
                                    placeholder="  Nhập Email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)} />
                                <span className="focus-input100" />
                            </div>

                            <span className="txt1">
                                     Password
                            </span>
                            <div className="wrap-input100 validate-input">

                                <div className=" ">
                                    <input
                                        className="input100"
                                        type="password"
                                        id="password"
                                        placeholder="  Enter password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}

                                    >

                                    </input>
                                    <span className="focus-input100"></span>
                                </div>
                            </div>
                            <div className="container-login100-form-btn m-t-17">

                                <button className="login100-form-btn">
                                    Đăng nhập
                                 </button>
                            </div>


                            <div className="w-full text-center p-t-55">
                                <span className="txt2">
                                    Bạn chưa có tài khoản?
                                 </span>
                                <Link to={`/register?redirect=${redirect}`}>
                                    Đăng kí
                                        </Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
