// Trong một thành phần React nào đó
import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import "./index.css";
import image from "../../assets/images/movie-wonder-woman.jpg";
import image1 from "../../assets/images/the-lion-king.jpg";
import image2 from "../../assets/images/vikings.jpg";
import image3 from "../../assets/images/arshin-mal-alan.jpg";
import image4 from "../../assets/images/rap-chieu-phim.jpg";
import { Button, Col, Image, Row } from 'antd';
import Nabav from '../../components/header';

import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';
import movieService from '../../api/management/movieService';
import { toast } from "react-toastify";
import MovieList from '../../components/movieComponent/MovieList';
// import { useHistory } from 'react-router-dom';

// // Fake API get images
// const fetchData = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const fetchData = [image, image, image, image, image, image];
//         resolve(fetchData);
//       }, 1000);
//     });
//   };

const HomePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [images1, setImages1] = useState([image1, image1, image1, image1]);
    const [images2, setImages2] = useState([image2, image2, image2, image2]);

    const getListMovie = async () => {
        try {
            const response = await movieService.getMovieList();
            console.log("response", response);
            toast.success(response.message);
            setData(response.content);

        } catch (error) {
            console.error(error.response);
            // toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        getListMovie();
    }, []);


    const handleImageHover = (index) => {
        setHoveredImage(index);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
    };

    const handleBooking = (id) => {
        navigate(`/movie-detail/${id}`);
    }

    return (
        <>
            <div className="homepage-body">
                <Nabav />
                <div className="homepage-header" >
                    <div className="homepage-header-image">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={hoveredImage === index ? "homepage-header-image-item-active" : "homepage-header-image-item"}
                                onMouseOver={() => handleImageHover(index)}
                                onMouseOut={handleImageLeave}
                                
                            >
                                {hoveredImage === index ? (
                                    <div className="image-container">
                                        <Image
                                            src={item.imageSrc}
                                            width="300px"
                                            height="400px"
                                            alt="image"
                                            preview={false}
                                        />
                                        <div className="movie-details">
                                            <div className="movie-details-text">{item.title}</div>
                                            <Button onClick={() => handleBooking(item?.id)}>Book now</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Image
                                        src={item.imageSrc}
                                        width="150px"
                                        height="200px"
                                        alt="image"
                                        preview={false}
                                        
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="homepage-container">
                    <div className="homepage-container-list">
                        <div className="homepage-container-list-item">
                            <div className="homepage-container-list-item-header">
                                <h2>Đang chiếu</h2>
                                <Button >
                                    see more <ArrowRightOutlined />
                                </Button>
                            </div>
                            <div className="homepage-container-list-item-content">
                                
                                <MovieList movies={data} />
                            </div>
                        </div>
                        <div className="homepage-container-list-item">
                            <div className="homepage-container-list-item-header">
                                <h2>Sắp chiếu</h2>
                                <Button>see more <ArrowRightOutlined /></Button>
                            </div>
                            <div className="homepage-container-list-item-content">
                                {images2.map((image, index) => (
                                    <div className="image-container">
                                        <Image
                                            key={index}
                                            src={image}
                                            width="300px"
                                            height="400px"
                                            alt="image"
                                            preview={false}
                                        />
                                        <div className="homepage-container-list-item-content-details">
                                            <div className="homepage-container-list-item-content-details-text">Vikings</div>
                                            <div className="homepage-container-list-item-content-details-date">20 April</div>
                                            <div className="homepage-container-list-item-content-details-category">18+</div>
                                            <Button>En</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="homepage-container-about-us">
                        <h2 className="homepage-container-about-us-title">Về chúng tôi</h2>
                        <div className="homepage-container-about-us-history">
                            <Row className="homepage-container-about-us-history-detail-1">
                                <Col span={11}>
                                    <Image
                                        src={image3}
                                        alt="image"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={2}></Col>
                                <Col span={8}>
                                    <h2>Arshin Mal Alan</h2>
                                    <p>Arshin Mal Alan Azerbaijani: Arşn mal alan Tāā Mead Kasja, lit.
                                        'The Cloth Peddler'. is a 1913 comic and romantic operetta by
                                        Azerbaijani composer Uzeyir Hajibeyov about a cloth peddler in
                                        1900s Shusha, who is looking for a wife. Hajibeyov composed the
                                        operetta in Saint Petersburg and it was staged on October 25, 1913.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="homepage-container-about-us-history">
                            <Row className="homepage-container-about-us-history-detail-2">
                                <Col span={2}></Col>
                                <Col span={8}>
                                    <h2>About us</h2>
                                    <p>Arshin Mal Alan Azerbaijani: Arşn mal alan Tāā Mead Kasja, lit.
                                        'The Cloth Peddler'. is a 1913 comic and romantic operetta by
                                        Azerbaijani composer Uzeyir Hajibeyov about a cloth peddler in
                                        1900s Shusha, who is looking for a wife. Hajibeyov composed the
                                        operetta in Saint Petersburg and it was staged on October 25, 1913.
                                    </p>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={11}>
                                    <Image
                                        src={image4}
                                        alt="image"
                                        preview={false}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="homepage-container-cinema-corner">

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default HomePage;
