import { useNavigate } from "react-router-dom"
import cinemaService from "../../api/management/cinemaSevice";
import movieService from "../../api/management/movieService";
import { toast } from "react-toastify";
import { Form,Button,Input,Select} from "antd";
import { Option } from "antd/es/mentions";
import scheduleService from "../../api/management/scheduleService";
import { useState,useEffect } from "react";

const AddSchedule =()=>{
    const navigate=useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [cinemaList, setCinemaList] = useState([]);

    const getDataList= async ()=>{
        const res1= await movieService.getMovieList();
        const res2= await cinemaService.getCinemaList();
        setMovieList(res1.content);
        setCinemaList(res2.content);
    }
    useEffect(() => {
        getDataList();
      }, []);

    const onFinish = async (values) => {
        try {
            console.log(values);
          const response = await scheduleService.addSchedule(values);
          console.log(response);
          toast.success(response.message);
          navigate("../schedule");
        } catch (error) {
          console.error(error.response.message);
          toast.error(error.response.data.message);
        }
      };

      return (
        <>
      <Form onFinish={onFinish}>
        <div className="container">
          <div className="card">
            <div className="card-header bg-info">
              Thêm mới lịch chiếu
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Cinema Name:</label>
                <Form.Item name="cinemaId" rules={[{ required: true, message: 'Please input cinema name!' }]}>
                  <Select placeholder="Select cinema" className="form-control">
                    {cinemaList.map((cinema) => (
                      <Option key={cinema.id} value={cinema.id}>{cinema.cinemaName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="form-group">
                <label>Movie Title:</label>
                <Form.Item name="movieId" rules={[{ required: true}]}>
                  <Select  placeholder="Select movie" className="form-control">
                    {movieList.map((movie) => (
                      <Option key={movie.id} value={movie.id}>{movie.title}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="form-group">
                <label> Showtime:</label>
                <Form.Item name="showtime" rules={[{ required: true}]}>
                  <Input type="text" className="form-control" />
                </Form.Item>
              </div>

              

              <div className="form-group">
                <Button type="primary" htmlType="submit">Thêm</Button>
                <Button type="default" htmlType="reset" danger={true}>Reset Data</Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
      );
    }
    
    export default AddSchedule;
    