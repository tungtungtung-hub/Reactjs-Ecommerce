import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không đúng!');
        } else {
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div className="limiter">
            <div className="container-login100" onSubmit={submitHandler} style={{ backgroundImage: 'url("../bg-01.jpg")' }}>
                <div className="wrap-login100">
                    <form className="login100-form" >
                        <div className="text-center text-primary font24">
                            Tạo tài khoản
                </div>
                        <br></br>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                        
                        <div className="form-group">
                        <div className="p-t-31 p-b-10">
                            <span className="txt1">
                                Tên
                             </span>
                        </div>
                           
                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="text"
                                    id="name"
                                    placeholder="  Nhập tên"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                <span className="focus-input100"></span>
                            </div>
                        </div>
                        <div className="form-group">
                        <div className="p-t-31 p-b-9">
                            <span className="txt1">
                                Email
                             </span>
                        </div>
                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="email"
                                    id="email"
                                    placeholder="  Enter email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                <span className="focus-input100"></span>
                            </div>
                        </div>
                        <div className="form-group">
                        <div className="p-t-31 p-b-9">
                            <span className="txt1">
                                Mật khẩu
                             </span>
                        </div>
                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="password"
                                    id="password"
                                    placeholder="  Nhập mật khẩu"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                                <span className="focus-input100"></span>
                            </div>
                        </div>
                        <div className="form-group">
                        <div className="p-t-31 p-b-9">
                            <span className="txt1">
                                Xác nhận mật khẩu
                             </span>
                        </div>
                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="  Nhập lại mật khẩu"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></input>
                                <span className="focus-input100"></span>
                            </div>
                        </div>
                        <div className="container-login100-form-btn m-t-17">

                                <button className="login100-form-btn">
                                    Đăng kí
                                 </button>
                            </div>
                            <div className="w-full text-center p-t-55">
                                <span className="txt2">
                                    Bạn đã có tài khoản?
                                 </span>
                                <Link to={`/signin?redirect=${redirect}`}>
                                    Đăng nhập
                                        </Link>
                            </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}
