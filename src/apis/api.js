import axios from 'axios';
export default axios.create({
    baseURL:'https://leonardoaranibar.co.cr:48452',
    responseType: 'json'
})