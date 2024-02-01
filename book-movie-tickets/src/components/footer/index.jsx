import React from 'react';
import logo from "../../assets/images/cgv.jpg";
import { Image, Switch } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import "./index.css";

const Footer = () => {
    return (
        <>
            <div className="homepage-footer">
                <div className="homepage-footer-item">
                    <h3>PROFILE</h3>
                    <ul>
                        <li>FAQ's</li>
                        <li>Pricing plans</li>
                        <li>Order tracking</li>
                        <li>Return</li>
                    </ul>
                </div>
                <div className="homepage-footer-item">
                    <h3>RECENT PORTS</h3>
                    <ul>
                        <li>Touch of uniqueness</li>
                        <li>Offices you won't foget</li>
                        <li>Cicilan</li>
                    </ul>
                </div>
                <div className="homepage-footer-item">
                    <h3>CUSTOMER</h3>
                    <ul>
                        <li>Help & contact us</li>
                        <li>Return</li>
                        <li>Online stores</li>
                        <li>Terms & cordition</li>
                    </ul>
                </div>
                <div className="homepage-footer-item">
                    <h3>CONTACT</h3>
                    <div className="homepage-footer-item-contact">
                        <div><InstagramOutlined /></div>
                        <div><TwitterOutlined /></div>
                        <div><FacebookOutlined /></div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Footer;