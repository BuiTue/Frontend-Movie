import instance from "../axiosClient"

const scheduleService ={
    getScheduleList(){
        return instance.get("api/v1/schedule/get-all")
    },
    getScheduleById(id){
        return instance.get("api/v1/schedule/finfById?id="+id)
    },
    addSchedule(body){
        return instance.post("api/v1/schedule/create",body)
    },
    updateSchedule(body){
        return instance.put("api/v1/schedule/update",body)
    },
    deleteSchedule(id){
        return instance.delete("api/v1/schedule/delete?id="+id)
    },
}
export default scheduleService;