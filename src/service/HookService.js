import axios from "axios";

const baseURL = "https://localhost:44343/"

class HookService {

    findAll = async() => {
        return await axios.get(baseURL).then(res => res);
    };

    getMovieById = async(id) => {
        return await axios.get(baseURL + id).then(res => res);
    };

    saveMovie = async(data) => {
        return await axios.post(baseURL, data).then(res => res);
    };

    updateMovie = async(data) => {
        return await axios.put(baseURL, data).then(res => res);
    };

    deleteMovieById = async(id) => {
        return await axios.delete(baseURL + id).then(res => res);
    };

}

export default HookService;