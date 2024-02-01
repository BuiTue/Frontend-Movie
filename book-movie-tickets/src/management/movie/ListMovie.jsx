import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import movieService from "../../api/management/movieService";
import { useNavigate } from 'react-router-dom';



function ListMovie() {
  const [movieList, setMovieList] = useState([])
  const navigate=useNavigate();

useEffect(() => {
    const getListMovie = async () => {
      try {
        const response = await movieService.getMovieList();
        toast.success(response.message);
        setMovieList(response.content);
    
        console.log(response.content);
      } catch (error) {
        console.error(error.response);
        // toast.error(error.response.data.message);
      }
    };
  
    getListMovie();
  }, []);
  const goAddPage=()=>{
    navigate('../addMovie')
  }
  const goUpdate=(id)=>{
    navigate(`../updateMovie/${id}`)
  }
  const deleteMovie = async (id) => {
    try {
      // Alert xác nhận xóa
      const isConfirmed = window.confirm('Are you sure you want to delete this movie?');
      
      if (isConfirmed) {
        console.log(id);
        await movieService.deleteMovie(id);

        setMovieList((preMovieList) => preMovieList.filter((movie) => movie.id !== id));
        
      } else {
        console.log('Deletion canceled');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  

  return (
    <>
      <div className="container">

        <div className="card mt-3">
          
          <div className="card-header bg-info">
          <Row>
            <Col>
            Data Management
            </Col>
            <Col style={{marginLeft:800}}>
            <div><Button variant="success" onClick={goAddPage}>Thêm phim mới</Button>{' '}</div>
            </Col>
            </Row>
          </div>
          
          
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Genre</th>
                  <th>Director</th>
                  <th>Cast</th>
                  <th>ReleaseDate</th>
                  <th>Duration</th>

                </tr>
              </thead>
              <tbody>
                {movieList.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>{movie.content}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.director}</td>
                    <td>{movie.cast}</td>
                    <td>{movie.releaseDate}</td>
                    <td>{movie.duaration}</td>
                    
                    
                    <td>
                      <button className="btn btn-warning" onClick={() => goUpdate(movie.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteMovie(movie.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListMovie;
