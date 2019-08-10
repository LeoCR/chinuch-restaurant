import axios from 'axios';
export default axios.create({
    baseURL:'https://localhost:48452',
    responseType: 'json'
})