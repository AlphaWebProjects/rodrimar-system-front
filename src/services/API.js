import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACK_END_URL;

function CreateAccount(body) {
    return axios.post(`${BASE_URL}/auth/sign-up`, body);
}
function CreateSession(body) {
    return axios.post(`${BASE_URL}/auth/sign-in`, body);
}
function LogoutSession(token) {
    return axios.delete(`${BASE_URL}/auth/logout`, {headers: { Authorization: `Bearer ${token}`}});
}

const api = {
    CreateAccount,
    CreateSession,
    LogoutSession
};

export default api;
