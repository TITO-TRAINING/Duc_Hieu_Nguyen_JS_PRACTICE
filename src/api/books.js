import axios from 'axios';

const host = 'http://localhost:3021/';

export default axios.create({
  baseURL: host,
});
