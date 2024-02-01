import instance from "../axiosClient"

const movieService ={
    getMovieList(){
        return instance.get("api/v1/movie/get-all")
    },
    getMovieById(id){
        return instance.get("api/v1/movie/findById?id="+id)
    },
    addMovie(body){
        return instance.post("api/v1/movie/create",body)
    },
    updateMovie(body){
        return instance.put("api/v1/movie/update",body)
    },
    deleteMovie(id){
        return instance.delete("api/v1/movie/delete?id="+id)
    },
}
export default movieService;