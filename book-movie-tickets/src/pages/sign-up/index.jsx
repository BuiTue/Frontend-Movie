// Trong một thành phần React nào đó
import React from 'react';
import { Button, Row, Col, Form, Input, Checkbox, Image, DatePicker } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import "./index.css";
import { Link, useNavigate } from 'react-router-dom';
import ImageLogin from "../../assets/images/login.jpg"
import { getAcessToken } from '../../api/auth/helper';
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import authService from '../../api/auth/authService';
import instance from '../../api/axiosClient';

const SignUp = () => {
    const navigate = useNavigate()
  const token = getAcessToken();
  if (token) {
    return <Navigate to="/" replace />;
  }

    const onFinish = async (values) => {
        try {
            const response = await authService.register(values);
            toast.success(response.message);
            const autologin = await instance.post(`api/v1/auth/login-jwt?username=${values.username}&password=${values.password}`);
            console.log(autologin);
            localStorage.setItem("userInfo", JSON.stringify(autologin));
            localStorage.setItem("token", autologin.token);
            navigate("/");
          } catch (error) {
            toast.error(error.response.data.message);
          }
        };

    

    return (
        <>
            <div className='sign-up-container'>
                {/* <div className='sign-up-content'> */}
                <Row>
                    <Col span={8}>
                        <div className="sign-up-header">
                            <h2>Sign up</h2>
                        </div>
                        <Form
                            // name="basic"
                            layout="vertical"
                            onFinish={onFinish}

                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                {/* <DatePicker /> */}<Input/>
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Invalid email format!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Sign up
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="sign-up-footer">
                            <div className="sign-up-footer-or">
                                <div className="sign-up-footer-line-1"></div>
                                <div>or</div>
                                <div className="sign-up-footer-line-2"></div>
                            </div>
                            <Button >
                                Continue with Google <GoogleOutlined />
                            </Button>
                            <div className="sign-up-footer-link"><p>Alreadly have an account <Link to="/login">Sign in</Link></p></div>
                        </div>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={12} className="sign-up-image">
                        <Image
                            src={ImageLogin}
                            width="100%"
                            height="90%"
                            alt="Login image"
                            preview={false}
                        />
                    </Col>
                </Row>
            </div>
            {/* </div > */}
        </>
    );
}

export default SignUp;
