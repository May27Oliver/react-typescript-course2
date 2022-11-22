import axios from 'axios';

const recommendAxios = axios.create({
    baseURL:"http://123.56.149.216:8080",
    headers: { 
        'Content-Type': 'application/json, charset=utf-8',
        'x-icode': '588A543B98CB0B30'
    },
})
export const postRecommendList = ({ url, params }) => recommendAxios.post( url , params)
export const getRecommendList = url => recommendAxios.get(url)