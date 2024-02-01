import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import {Button,Input,message} from "antd";
import movieService from "../../api/management/movieService";
import { useState,useEffect } from "react";
import instance from "../../api/axiosClient";


const UpdateMovie =()=>{
    const navigate=useNavigate();
    const params=useParams();
    const[movie,setMovie]=useState([])
    useEffect(() => {
        const getMovieDetail = async () => {
          try {
            console.log(params);
            const response = await instance.get("/api/v1/movie/findById?id="+params.id);
            setMovie(response);
            console.log(response);
            
            
            
          } catch (error) {
            message.error('Failed to fetch movie details');
          }
        };
    
        if (params.id) {
          getMovieDetail();
        }
      }, [params.id]);
    const onFinish = async () => {
        try {
          const response = await instance.put("api/v1/movie/update",{
            id:params.id,
            title:movie.title,
            content:movie.content,
            genre:movie.genre,
            director:movie.director,
            cast:movie.cast,
            releaseDate:movie.releaseDate,
            duaration:movie.duaration  
          });
          console.log(response);
          toast.success(response.message);
          navigate("../movie");
        } catch (error) {
          console.error(error.response.message);
          toast.error(error.response.data.message);
        }
      };
      const handleChange = (field, value) => {
        setMovie((preMovie) => ({
          ...preMovie,
          [field]: value,
        }));
      };
      

      return (
        <>
        
      <div className="container">
        <div className="card">
          <div className="card-header bg-info">
            Cập nhập thông tin phim
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Title: </label>
              <Input className="form-control"
                     value={movie.title}
                     onChange={(e) => handleChange("title", e.target.value)}/>   
             </div>

            <div className="form-group">
              <label>Content: </label>
              <Input className="form-control"
                     value={movie.content}
                     onChange={(e) => handleChange("content", e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Genre: </label>
              <Input className="form-control"
                     value={movie.genre}
                     onChange={(e) => handleChange("genre", e.target.value)}/>
              
            </div>

            <div className="form-group">
              <label>Director: </label>
              <Input className="form-control"
                     value={movie.director}
                     onChange={(e) => handleChange("director", e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Cast: </label>
              <Input className="form-control"
                     value={movie.cast}
                     onChange={(e) => handleChange("cast", e.target.value)}/>
            </div>
            <div className="form-group">
              <label>RealeaseDate: </label>
              <Input className="form-control"
                     value={movie.releaseDate}
                     onChange={(e) => handleChange("releaseDate", e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Duration: </label>
              <Input className="form-control"
                     type="number"
                     value={movie.duaration}
                     onChange={(e) => handleChange("duaration", e.target.value)}/>
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
    
    export default UpdateMovie;
    