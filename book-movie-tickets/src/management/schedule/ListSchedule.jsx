import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import scheduleService from '../../api/management/scheduleService';
import { useNavigate } from 'react-router-dom';



function ListSchedule() {
  const [scheduleList, setScheduleList] = useState([])
  const navigate =useNavigate();

useEffect(() => {
    const getListSchedule = async () => {
      try {
        const response = await scheduleService.getScheduleList();
        toast.success(response.message);
        console.log(response);
        setScheduleList(response.content);
    
        console.log(response.content);
      } catch (error) {
        console.error(error.response);
        // toast.error(error.response.data.message);
      }
    };
  
    getListSchedule();
  }, []);
  const goAddPage=()=>{
    navigate('../addSchedule')
  }
  const goUpdate=(id)=>{
    navigate(`../updateSchedule/${id}`)
  }
  const deleteSchedule = async (id) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this schedule?');
      
      if (isConfirmed) {
        console.log(id);
        await scheduleService.deleteSchedule(id);

        
        setScheduleList((preScheduleList) => preScheduleList.filter((schedule) => schedule.id !== id));
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
            <div><Button variant="success" onClick={goAddPage}>Thêm lịch chiếu mới</Button>{' '}</div>
            </Col>
            </Row>
          </div>
          
          
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>movieTitle</th>
                  <th>Cinema</th>
                  <th>Showtime</th>
    

                </tr>
              </thead>
              <tbody>
                {scheduleList.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.id}</td>
                    <td>{schedule.movieTitle}</td>
                    <td>{schedule.cinemaCinemaName}</td>
                    <td>{schedule.showtime}</td>
                    
                    
                    
                    <td>
                      <button className="btn btn-warning" onClick={() => goUpdate(schedule.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteSchedule(schedule.id)}>Remove</button>
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

export default ListSchedule;
