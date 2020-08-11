import axios from 'axios';
import config from '../config/config';

console.log(config.host)

export default axios.create({
    baseURL: config.host,
    timeout: 1000
})