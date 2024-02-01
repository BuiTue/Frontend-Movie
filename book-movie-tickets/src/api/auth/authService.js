import instance from "../axiosClient"

const authService ={
    register(body){
        return instance.post("api/v1/auth/register",body)
    }
}
export default authService;