// Trong một thành phần React nào đó
import React from 'react';
import "./index.css";
import { Button, Col, DatePicker, Image, Row, Select, Switch } from 'antd';
import Nabav from '../../components/header';
import Footer from '../../components/footer';
import Grid from 'antd/es/card/Grid';
// import imageDetail from "../../assets/images/Aquaman_And_The_Lost_Kingdom_VN_poster.jpg"
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';
import movieService from '../../api/management/movieService';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import scheduleService from '../../api/management/scheduleService';
import cinemaService from '../../api/management/cinemaSevice';


const MovieDetail = ({  }) => {
    const navigate=useNavigate();
    const [dataDetail, setDataDetail] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    // Lấy đối tượng URLSearchParams từ chuỗi truy vấn
    const params=useParams();
    // const handleCinemaChange = (value) => {
    //     setSelectedCinema(value);
    
    //     const cinemaSchedule = schedule.filter((schedules) => schedules.cinemaCinemaName === value);
    //     const showtimes = cinemaSchedule.map((showtime) => showtime.showtime);
    
    //     setSelectedShowtime(showtimes);
    //   };
    const handleCinemaChange = (value) => {
        setSelectedCinema(value);
      };
      const handleShowtimeClick = (item) => {
        setSelectedShowtime(item);

        // Lưu thông tin lịch chiếu vào state
        const selectedSchedule = {
            id: item.id,
            showtime: item.showtime,
            movieTitle: dataDetail.title,
            cinemaCinemaName: selectedCinema,
        };
        const movieDetail ={
            id: dataDetail.id,
            title: dataDetail.title,
            content:dataDetail.content ,
            genre: dataDetail.genre,
            director: dataDetail.director,
            cast: dataDetail.cast,
            releaseDate: dataDetail.releaseDate,
            duaration: dataDetail.duaration,
            imageSrc: dataDetail.imageSrc,
        }

        // Điều hướng sang trang sơ đồ ghế với thông tin lịch chiếu đã chọn
        navigate('/seat-selection', { state: { selectedSchedule, movieDetail } });
    };
    

    // api lấy chi tiết dựa vào id ở đây
    const getMovieDetail = async () => {
        try {
            const response = await movieService.getMovieById(params.id);
            const getCinema=await cinemaService.getCinemaList();

            setCinema(getCinema.content);
            console.log("response", response);
            toast.success(response.message);
            setDataDetail(response);
            setSchedule(response.scheduleDTOS);
            console.log(response.scheduleDTOS);

        } catch (error) {
            console.error(error.response);
            // toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        getMovieDetail();
    }, []);

    // nhìn dataDetail thay vào những chỗ đang hackcode

    return (
        <>
            <div className="movie-detail-body">
                <Nabav />
                <div className="movie-detail-background"> <Image
                        src={dataDetail.imageSrc}
                        width="1550px"
                        height="900px"
                        alt="image"
                        preview={false}
                    /> </div>
                <div className="movie-detail-introduce">
                    <Image
                        src={dataDetail.imageSrc}
                        width="400px"
                        height="500px"
                        alt="image"
                        preview={false}
                    />
                    <div>
                        <h2>{dataDetail.title}</h2>
                        <div className="movie-detail-introduce-time">
                            <div><FieldTimeOutlined /> {dataDetail.duaration} phút</div>
                            <div><CalendarOutlined /> {dataDetail.releaseDate}</div>
                        </div>
                        {/* <div className="movie-detail-introduce-producer">
                            Nhà sản xuất: Warner Bros, DC Entertainment
                        </div> */}
                        <div className="movie-detail-introduce-category">
                            Thể loại: {dataDetail.genre}
                        </div>
                        <div className="movie-detail-introduce-director">
                            Đạo diễn: {dataDetail.director}
                        </div>
                        <div className="movie-detail-introduce-performer">
                            Diễn viên: {dataDetail.cast}
                        </div>
                    </div>
                </div>
                <div className="movie-detail-content">
                    <h2>Nội dung phim</h2>
                    <p style={{fontSize:18}}>{dataDetail.content}</p>
                </div>
                
                <div className="movie-detail-showtimes">
        <h2>Lịch chiếu</h2>
        <Row gutter={10}>
          <Col span={6}>
            <DatePicker placeholder="Chọn ngày" />
          </Col>
          <Col span={6}></Col>
          <Col span={6}>
            <Select placeholder="Toàn quốc">
              <Select.Option>Toàn quốc</Select.Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Tất cả rạp"
              onChange={handleCinemaChange}
              value={selectedCinema}
            >
              {cinema.map((schedules) => (
                <Select.Option key={schedules.id} value={schedules.cinemaName}>
                  {schedules.cinemaName}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

     
      <div className="movie-detail-theater-showtimes">
        <div>
          <h2 style={{marginBottom:'30px'}}>{selectedCinema}</h2>
          <div className="movie-detail-theater-showtimes-item">
            <div>2D phụ đề</div>
            <div className="movie-detail-theater-showtimes-item-time">
            <Grid container spacing={2} className="horizontal-buttons-container">
    {schedule
      .filter((item) => item.cinemaCinemaName === selectedCinema)
      .map((item) => (
        <Grid item xs={2} key={item.id}>
          <Button className="horizontal-button" style={{ whiteSpace: 'normal' }} onClick={() => handleShowtimeClick(item)}>
            {item.showtime}
          </Button>
        </Grid>
      ))}
  </Grid>
            </div>
          </div>
        </div>
      </div>
                <Footer />
            </div>
        </>
    );
}

export default MovieDetail;
