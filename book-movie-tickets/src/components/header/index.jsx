import React from 'react';
import logo from "../../assets/images/cgv.jpg";
import "./index.css";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Switch } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { getAcessToken, getUserInfo } from '../../api/auth/helper';

const Header = () => {
    const navigate = useNavigate();
    const token = getAcessToken();
    const userInfo= getUserInfo();

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        // Thực hiện các bước đăng xuất, ví dụ: xóa token, cập nhật trạng thái, ...
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        // Điều hướng đến trang chủ hoặc trang đăng nhập (tùy thuộc vào yêu cầu của bạn)
        navigate('/');
    };

    return (
        <>
            <div className="header-nabav">
                <div className="header-nabav-style">
                    <div className="header-nabav-logo" onClick={() => navigate("/")}>
                        <Image
                            src={logo}
                            width="50px"
                            height="44px"
                            alt="logo"
                            preview={false}
                        />
                        <div className="header-nabav-logo-note">
                            <h3>CGV</h3>
                            <p>movie center</p>
                        </div>
                    </div>
                    <div className="header-nabav-info">
                        
                        {token ? (
                            // Nếu có token, hiển thị thông tin người dùng và nút đăng xuất
                            <>
                                <div className="header-nabav-info-user">
                                    <span style={{fontSize:'18px',marginLeft:10}}> {userInfo.fullName}</span>
                                </div>
                                <div className="header-nabav-info-logout" onClick={handleLogout} style={{ fontSize: '20px',backgroundColor:'orange',borderRadius:10,width:'120px',height:'40px'   }}>
                                    
                                    <LogoutOutlined  />
                                    <span style={{fontSize:'16px',marginLeft:10}}>Đăng xuất      </span>
                                </div>
                            </>
                        ) : (
                            // Nếu không có token, hiển thị nút Đăng nhập và Đăng ký
                            <>
                                <div className="header-nabav-info-login" onClick={() => navigate("/login")}>
                                    <span>Đăng nhập</span>
                                </div>
                        
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;