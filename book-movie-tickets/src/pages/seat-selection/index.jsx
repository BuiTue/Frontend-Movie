// Trong một thành phần React nào đó
import React from 'react';
import "./index.css";
import { Button, Col, DatePicker, Image, Row, Select, Switch } from 'antd';
import Nabav from '../../components/header';
import Footer from '../../components/footer';
import image from "../../assets/images/location.png";
import imageDetail from "../../assets/images/Aquaman_And_The_Lost_Kingdom_VN_poster.jpg";
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import SeatSelectionPage from '../../components/seatMap/SeatSelectionPage';
import { useState,useEffect } from 'react';
import CinemaHall from '../../components/seatMap/CinemaHall';
import movieService from '../../api/management/movieService';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../api/auth/helper';
import instance from '../../api/axiosClient';
import { toast } from "react-toastify";
import { message,Modal,notification } from 'antd';

const SeatSelection = () => {
    const location=useLocation();
    const navigate=useNavigate(); 
    const userInfo=getUserInfo();
    const { selectedSchedule, movieDetail } = location.state || {};
    const rows = 8;
    const columns = 10;
    const [movie,setMovie]=useState([]);
    const [schedule,setSchedule]=useState([]);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const seatPrices = {
      0: 75000,
      1: 80000,
      2: 80000,
      3: 90000,
      4: 90000,
      5: 80000,
      6: 80000,
      7: 75000,
      8: 70000,
    };
    const bookTicket= async()=>{
      const ticketList = selectedSeats.map((seat) => ({
        userId: userInfo.id,
        scheduleId: selectedSchedule.id,
        seatNumber: seat,
        price: seatPrices[parseInt(seat[0])], // Sử dụng giá vé tương ứng với hàng
      }));

      
      try {
        console.log(selectedSchedule);
        console.log(ticketList);
        const res1=await instance.post('api/v1/ticket/createList',ticketList)
        console.log(res1);
        Modal.success({
          title: 'Đặt vé thành công',
          content: 'Cảm ơn bạn đã đặt vé! Thông tin chi tiết sẽ được gửi đến email của bạn.',
          onOk: () => {
            // Chuyển hướng về trang chính hoặc trang lịch sử đặt vé
            navigate('/');
          },
        });
        
      } catch (error) {
        Modal.error({
          title: 'Đặt vé thất bại',
          content: 'Có lỗi xảy ra trong quá trình đặt vé. Vui lòng thử lại sau.',
        });
      }


    }
  
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    

    const handleShowtimeClick = (showtime) => {
        // Xử lý khi một suất chiếu được chọn
        setSelectedShowtime(showtime);
        console.log(showtime);
      };
    const handleChangeShowtime = () => {
        // Thực hiện các xử lý cần thiết khi muốn đổi suất chiếu
    
        // Quay lại trang trước
        navigate(-1);
    };

    // useEffect(() => {
    //     const getListMovie = async () => {
    //       try {
    //         const response = await movieService.getMovieById(1);
    //         setMovie(response);
    //         setSchedule(response.scheduleDTOS)
    //         console.log(movieDetail);
        
    //         console.log(response.scheduleDTOS);
    //       } catch (error) {
    //         console.error(error.response);
    //         // toast.error(error.response.data.message);
    //       }
    //     };
      
    //     getListMovie();
    //   }, []);
  
    useEffect(() => {
      // Tính tổng giá vé dựa trên số lượng ghế đã chọn và giá vé của hàng
      const calculatedTotalPrice = selectedSeats.reduce((total, seat) => total + seatPrices[parseInt(seat[0])], 0);
      setTotalPrice(calculatedTotalPrice);
    }, [selectedSeats]);
  
    const handleSeatClick = (row, column, seatPrice) => {
      const seat = `${row}${column}`;
      setSelectedSeats((prevSeats) => {
        if (prevSeats.includes(seat)) {
          // Nếu ghế đã được chọn, hủy chọn ghế đó
          return prevSeats.filter((selectedSeat) => selectedSeat !== seat);
        } else {
          // Ngược lại, thêm ghế vào danh sách đã chọn
          return [...prevSeats, seat];
        }
      });
    };
    return (
        <>
           
            <div className="seat-selection-body">
      <Nabav />
      <div>
        <div className="seat-selection-showtimes">
          <div><Button onClick={handleChangeShowtime}>Đổi suất chiếu</Button></div>
          <div className="seat-selection-showtimes-time">
            <Row gutter={[16, 24]}>
            {schedule.map((showtime) => (
            <Col span={12} key={showtime.id}>
              <Button
                onClick={() => handleShowtimeClick(showtime)}
                type={selectedShowtime?.id === showtime.id ? 'primary' : 'default'}
              >
                {showtime.showtime}
              </Button>
            </Col>
          ))}
            </Row>
          </div>
        </div>
        <div className="seat-selection-container">
          <Row gutter={20}>
            <Col span={16}>
              {/* <Image src={image} width="100%" height="90%" alt="image" preview={false} /> */}
              <CinemaHall rows={rows} columns={columns} onSeatClick={handleSeatClick} seatPrices={seatPrices} />
            </Col>
            <Col span={8}>
              <div className="seat-selection-container-detail">
                <Image src={movieDetail.imageSrc} width="150px" height="180px" alt="image" preview={false} />
                <div>
                  <h2>{movieDetail.title}</h2>
                  <p>2D phụ đề</p>
                </div>
              </div>
              <div className="seat-selection-container-cinema">
                <div className="seat-selection-container-name">Rạp : {selectedSchedule.cinemaCinemaName}</div>
                <div>Suất :     {selectedSchedule.showtime} </div>
              </div>
              
              <div className="seat-selection-container-amount">
                <div>
                  <div>{selectedSeats.length} ghế đơn</div>
                  <div>Ghế: {selectedSeats.join(', ')}</div>
                </div>
                <div className="seat-selection-container-price">{totalPrice.toLocaleString()} đ</div>
              </div>
              <div className="seat-selection-container-total">
                <div>Tổng cộng</div>
                <div className="seat-selection-container-price">{totalPrice.toLocaleString()} đ</div>
              </div>
              <div className="seat-selection-container-btn">
                <Button className="btn-come-back">Quay lại</Button>
                <Button className="btn-next" onClick={bookTicket}>Đặt vé</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
        </>
    );
}

export default SeatSelection;
