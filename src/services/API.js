import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_END_URL;


function CreateSession(body) {
    return axios.post(`${BASE_URL}/auth/sign-in`, body);
}
function CreateUser(body) {
    return axios.post(`${BASE_URL}/auth/sign-up`, body);
}
function LogoutSession(token) {
    return axios.delete(`${BASE_URL}/auth/logout`, {headers: { Authorization: `Bearer ${token}`}});
}
function CreateImage({formData, token}) {
    return axios.post(`${BASE_URL}/image`, formData, {headers: { Authorization: `Bearer ${token}`}});
}


function getAllCategories(token){
    return axios.get(`${BASE_URL}/category`, {headers: { Authorization: `Bearer ${token}`}});
}

const api = {
    CreateSession,
    LogoutSession,
    CreateUser,
    CreateImage
};

export default api;
