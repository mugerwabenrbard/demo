import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : ("https://mugerwademo.herokuapp.com/api/")
})