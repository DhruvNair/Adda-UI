import axios from 'axios';
import config from '../config/config';

export default axios.create({
    baseURL: config.host,
    timeout: 1000
})