import axios from 'axios';
export default axios.create({
    baseURL:'//reactreduxrestaurant.herokuapp.com/',
    responseType: 'json'
})