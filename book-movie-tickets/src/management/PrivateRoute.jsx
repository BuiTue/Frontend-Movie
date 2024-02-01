import { Navigate } from "react-router-dom";
import { getAcessToken } from "../api/auth/helper";


const PrivateRoute = ({children})=>{
    const token =getAcessToken();
   
    if(!token){
        return <Navigate to={"login"} replace />
    }
    return (
        <>
        
           {children} {/*<Layout /> */}
        </>
      );
    };
    export default PrivateRoute;