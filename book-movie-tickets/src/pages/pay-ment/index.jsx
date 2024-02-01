import React from 'react';
import "./index.css";
import { Button, Col, DatePicker, Form, Image, Input, Radio, Row, Select, Switch } from 'antd';
import Nabav from '../../components/header';
import Footer from '../../components/footer';
// import imagePayoo from "../../assets/images/payoo.jpg";
// import imageShopeePay from "../../assets/images/shopee-pay.webp";
// import imageZalopay from "../../assets/images/zalopay.png";
// import imageVnpay from "../../assets/images/vnpay.png";
// import imageMomo from "../../assets/images/momo.png";
// import imageDetail from "../../assets/images/Aquaman_And_The_Lost_Kingdom_VN_poster.jpg";
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';

const Payment = () => {
    const onFinish = () => { };
    return (
        <>
            <div className="pay-ment-body">
                <Nabav />
                <div className="pay-ment-sale">
                    <div className="pay-ment-sale-title">Khuyến mại</div>
                    <Form
                        layout="inline"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="sale"
                            label="Mã khuyến mại"
                        >
                            <Input style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">
                                Áp dụng
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="pay-ment-sale-note">
                        Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán
                    </div>
                    <div className="pay-ment-sale-select">
                        <Select
                            defaultValue="1"
                            style={{
                                width: 200,
                            }}
                            options={[
                                {
                                    value: '1',
                                    label: 'Khuyến mại của bạn',
                                },
                            ]}
                        />
                    </div>
                    <div className="pay-ment-sale-select">
                        <Select
                            defaultValue="1"
                            style={{
                                width: 200,
                            }}
                            options={[
                                {
                                    value: '1',
                                    label: 'Áp dụng điểm Stars',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className="pay-ment-methods">
                    <div className="pay-ment-methods-title">Phương thức thanh toán</div>
                    <div className="pay-ment-methods-item">
                        <Radio>
                            {/* <Image
                                src={imagePayoo}
                                width="40px"
                                height="40px"
                                alt="image"
                                preview={false}
                            /> */}
                            HSBC/Payoo-ATM/VISA/MASTER/JBC/QRCODE
                        </Radio>
                    </div>
                    <div className="pay-ment-methods-item">
                        <Radio>
                            {/* <Image
                                src={imageShopeePay}
                                width="40px"
                                height="40px"
                                alt="image"
                                preview={false}
                            /> */}
                            Ví ShopeePay
                        </Radio>
                    </div>
                    <div className="pay-ment-methods-item">
                        <Radio>
                            {/* <Image
                                src={imageZalopay}
                                width="40px"
                                height="40px"
                                alt="image"
                                preview={false}
                            /> */}
                            ZaloPay
                        </Radio>
                    </div>
                    <div className="pay-ment-methods-item">
                        <Radio>
                            {/* <Image
                                src={imageVnpay}
                                width="40px"
                                height="40px"
                                alt="image"
                                preview={false}
                            /> */}
                            VNPAY
                        </Radio>
                    </div>
                    <div className="pay-ment-methods-item">
                        <Radio>
                            {/* <Image
                                src={imageMomo}
                                width="40px"
                                height="40px"
                                alt="image"
                                preview={false}
                            /> */}
                            MOMO
                        </Radio>
                    </div>
                    <div className="pay-ment-methods-note">
                        (*) Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhậnhiểu rõ các quy định giao dịch trực tuyến của CGV
                    </div>
                </div>
                <div className="pay-ment-container">
                    <div className="pay-ment-container-detail">
                        {/* <Image
                            src={imageDetail}
                            width="150px"
                            height="180px"
                            alt="image"
                            preview={false}
                        /> */}
                        <div>
                            <h2>Aquaman Và Vương Quốc Thất Lạc</h2>
                            <p>2D phụ đề</p>
                        </div>
                    </div>
                    <div className="pay-ment-container-cinema">
                        <div className="pay-ment-container-name">CGV Trần Duy Hưng</div>
                        <div>Suất: Time</div>
                    </div>
                    <div className="pay-ment-container-amount">
                        <div>
                            <div>2 ghế đơn</div>
                            <div>Ghế: K14, K15</div>
                        </div>
                        <div className="pay-ment-container-price">170.000 đ</div>
                    </div>
                    <div className="pay-ment-container-total">
                        <div>Tổng cộng</div>
                        <div className="pay-ment-container-price">340.000 đ</div>
                    </div>
                    <div className="pay-ment-container-btn">
                        <Button className="btn-come-back">Quay lại</Button>
                        <Button className="btn-next">Tiếp tục</Button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Payment;

