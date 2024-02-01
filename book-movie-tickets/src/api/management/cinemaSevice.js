import instance from "../axiosClient"

const cinemaService ={
    getCinemaList(){
        return instance.get("api/v1/cinema/get-all")
    },
    addCinema(body){
        return instance.post("api/v1/cinema/create",body)
    },
    updateCinema(body){
        return instance.put("api/v1/cinema/update",body)
    },
    deleteCinema(id){
        return instance.delete("api/v1/cinema/delete?id="+id)
    },
}
export default cinemaService;