// Trong một thành phần React nào đó
import React from 'react';
import { Button, Row, Col, Form, Input, Checkbox, Image } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import "./index.css";
import { Link } from 'react-router-dom';
import ImageLogin from "../../assets/images/login.jpg";
import { Navigate,useNavigate } from 'react-router-dom/dist';
import { toast } from "react-toastify";
import { getAcessToken } from '../../api/auth/helper';
import instance from '../../api/axiosClient';

const SignIn = () => {

    const navigate = useNavigate();
    const token =getAcessToken();
    if (token) {
        return <Navigate to="/" replace />;
      }

    const onFinish = async (values) => {
        try {
            const response = await instance.post(`api/v1/auth/login-jwt?username=${values.username}&password=${values.password}`);
            toast.success(response.message);
            console.log(response);
            localStorage.setItem("userInfo", JSON.stringify(response));
            console.log(JSON.stringify(response));
            localStorage.setItem("token", response.token);
            navigate("/");
          } catch (error) {
            toast.error(error.response.data.message);
          }

    }

    return (
        <>
            <div className='login-container'>
                {/* <div className='login-content'> */}
                <Row>
                    <Col span={8}>
                        <div className="login-header">
                            <h2>Sign in</h2>
                            <p>Please login to continueto your account.</p>
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
                                    {
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

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                            >
                                <Checkbox>Keep me logged in</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="login-footer">
                            <div className="login-footer-or">
                                <div className="login-footer-line-1"></div>
                                <div>or</div>
                                <div className="login-footer-line-2"></div>
                            </div>
                            <Button >
                                Sign in with Google <GoogleOutlined />
                            </Button>
                            <div className="login-footer-link"><p>Need an account <Link to="/sign-up">Create one</Link></p></div>
                        </div>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={12}>
                        <Image 
                            src={ImageLogin}
                            width="100%"
                            height="100%"
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

export default SignIn;
