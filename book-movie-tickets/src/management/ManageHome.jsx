import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const ManageHome = () => {
  const navigate = useNavigate();
  

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  

  return (
    <div>
      
        <Button type="primary" onClick={logOut}>
          Log out
        </Button>
      
    </div>
  );
};

export default  ManageHome;