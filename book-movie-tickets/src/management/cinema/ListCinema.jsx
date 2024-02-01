import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cinemaService from '../../api/management/cinemaSevice';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';




function ListCinema() {
  const [cinemaList, setCinemaList] = useState([]);
  const navigate=useNavigate();

  const getListCinema = async () => {
    try {
      const response = await cinemaService.getCinemaList();
      toast.success(response.message);
      setCinemaList(response.content);
  
      console.log(response.content);
    } catch (error) {
      console.error(error.response);
      // toast.error(error.response.data.message);
    }
  };
useEffect(() => {
    getListCinema();
  }, []);

  const goAddPage=()=>{
    navigate('../addCinema')
  }
  const deleteCinema = async (id) => {
    try {
      // Màn hình xác nhận
      const isConfirmed = window.confirm('Are you sure you want to delete this cinema?');
      
      if (isConfirmed) {
        console.log(id);
        await cinemaService.deleteCinema(id);

        setCinemaList((prevCinemaList) => prevCinemaList.filter((cinema) => cinema.id !== id));
        
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
            <div><Button variant="success" onClick={goAddPage }>Thêm rạp chiếu</Button>{' '}</div>
            </Col>
            </Row>
          </div>
          
          
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Cinema Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>City</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cinemaList.map((cinema) => (
                  <tr key={cinema.id}>
                    <td>{cinema.id}</td>
                    <td>{cinema.cinemaName}</td>
                    <td>{cinema.address}</td>
                    <td>{cinema.phoneNumber}</td>
                    <td>{cinema.city}</td>
                    
                    
                    <td>
                      <button className="btn btn-warning">Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteCinema(cinema.id)}>Remove</button>
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

export default ListCinema;
