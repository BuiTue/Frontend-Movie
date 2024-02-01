import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { Form,Button,Input} from "antd";
import movieService from "../../api/management/movieService";


const AddMovie =()=>{
    const navigate=useNavigate();
    const onFinish = async (values) => {
        try {
          const response = await movieService.addMovie(values);
          console.log(response);
          toast.success(response.message);
          navigate("../movie");
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
            Thêm mới phim
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Title: </label>
              <Form.Item name="title" rules={[{ required: true, message: 'Please input movie title!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>Content: </label>
              <Form.Item name="content" rules={[{ required: true, message: 'Please input movie content!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>Genre: </label>
              <Form.Item name="genre" rules={[{ required: true, message: 'Please input genre!' }]}>
                <Input  className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>Director: </label>
              <Form.Item name="director" rules={[{ required: true, message: 'Please input director!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>
            <div className="form-group">
              <label>Cast: </label>
              <Form.Item name="cast" rules={[{ required: true, message: 'Please input cast!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>
            <div className="form-group">
              <label>RealeaseDate: </label>
              <Form.Item name="releaseDate" rules={[{ required: true, message: 'Please input release Date!' }]}>
                <Input className="form-control" />
              </Form.Item>
            </div>
            <div className="form-group">
              <label>Duration: </label>
              <Form.Item name="duaration" rules={[{ required: true, message: 'Please input duration!' }]}>
                <Input type="number" className="form-control" />
              </Form.Item>
            </div>

            <div className="form-group">
              <Button type="primary" htmlType="submit">Thêm</Button>
              <Button type="default" htmlType="reset" danger>Reset Data</Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
        </>
      );
    }
    
    export default AddMovie;
    