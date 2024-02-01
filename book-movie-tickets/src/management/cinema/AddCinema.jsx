import { useNavigate } from "react-router-dom"
import cinemaService from "../../api/management/cinemaSevice";
import { toast } from "react-toastify";
import { Form,Button,Input} from "antd";


const AddCinema =()=>{
    const navigate=useNavigate();
    
    const onFinish = async (values) => {
        try {
          const response = await cinemaService.addCinema(values);
          console.log(response);
          toast.success(response.message);
          navigate("../cinema");
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
            Thêm mới rạp chiếu phim
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Cinema Name: </label>
              <Form.Item name="cinemaName" rules={[{ required: true, message: 'Please input cinema name!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>Address: </label>
              <Form.Item name="address" rules={[{ required: true, message: 'Please input address!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>Phone Number: </label>
              <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input phone number!' }]}>
                <Input type="number" className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>City: </label>
              <Form.Item name="city" rules={[{ required: true, message: 'Please input city!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <Button type="primary" htmlType="submit">Thêm</Button>
              <Button type="default" htmlType="reset" danger="true">Reset Data</Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
        </>
      );
    }
    
    export default AddCinema;
    