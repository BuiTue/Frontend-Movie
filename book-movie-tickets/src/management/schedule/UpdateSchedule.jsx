import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { Button,Input,message,Select} from "antd";
import movieService from "../../api/management/movieService";
import cinemaService from "../../api/management/cinemaSevice";
import { useState,useEffect } from "react";
import scheduleService from "../../api/management/scheduleService";
import instance from "../../api/axiosClient";


const UpdateSchedule =()=>{
    const navigate=useNavigate();
    const params=useParams();
    const[schedule,setSchedule]=useState([])
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
    useEffect(() => {
        const getScheduleDetail = async () => {
          try {
            console.log(params);
            const response = await instance.get("api/v1/schedule/findById?id="+params.id);
            setSchedule(response);
            console.log(response);
            
            
          } catch (error) {
            message.error('Failed to fetch schedule details');
          }
        };
       
        if (params.id) {
            getScheduleDetail();
        }
      }, [params.id]);
    const onFinish = async () => {
        try {
          const response = await instance.put("api/v1/schedule/update",{
            id:params.id,
            cinemaId:schedule.cinemaId,
            movieId:schedule.movieId,
            showtime:schedule.showtime
              
          });
          console.log(response);
          toast.success(response.message);
          navigate("../schedule");
        } catch (error) {
          console.error(error.response.message);
          toast.error(error.response.data.message);
        }
      };
      const handleChange = (field, value) => {
        setSchedule((preSchedule) => ({
          ...preSchedule,
          [field]: value,
        }));
      };
      

      return (
        <>
        
        <div className="container">
          <div className="card">
            <div className="card-header bg-info">
              Cập nhập lịch chiếu
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Cinema Name:</label>
                <Select
            value={schedule.cinemaId}
            placeholder="Chọn loại sản phẩm"
            onChange={(value) => handleChange('cinemaId', value)}
          >
            {Array.isArray(cinemaList) &&
              cinemaList.map((cinema) => (
                <Select.Option value={cinema.id} key={cinema.id}>
                  {cinema.cinemaName}
                </Select.Option>
              ))}
          </Select>
              </div>

              <div className="form-group">
                <label>Movie Title:</label>
                <Select
            value={schedule.movieId}
            placeholder="Chọn loại sản phẩm"
            
            onChange={(value) => handleChange('movieId', value)}
          >
            {Array.isArray(movieList) &&
              movieList.map((movie) => (
                <Select.Option value={movie.id} key={movie.id} >
                  {movie.title}
                </Select.Option>
              ))}
          </Select>
              </div>

              <div className="form-group">
                <label> Showtime:</label>
                <Input className="form-control"
                     value={schedule.showtime}
                     onChange={(e) => handleChange("showtime", e.target.value)}/>
              </div>

              

              <div className="form-group">
                <Button type="primary" onClick={onFinish}>Cập nhập</Button>
                
              </div>
            </div>
          </div>
        </div>
    
        </>
      );
    }
    
    export default UpdateSchedule;
    