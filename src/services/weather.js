import axios from "../http-common";

export default {

    getCurrentConditions(city) {
        return axios
            .get(`${process.env.VUE_APP_API_URL}/weather/current/${city}`)
            .catch((error) => {
                console.log(error);
            });
    },
    getForecast(city) {
        return axios
            .get(`${process.env.VUE_APP_API_URL}/weather/forecast/${city}`)
            .catch((error) => {
                console.log(error);
            });
    },
    getCities(city) {
        return axios
            .get(`${process.env.VUE_APP_API_URL}/weather/search/${city}`)
            .catch((error) => {
                console.log(error);
            });
    },
    getIP() {
        return axios
            .get(`${process.env.VUE_APP_API_URL}/ip/address/`)
            .catch((error) => {
                console.log(error);
            });
    }
}