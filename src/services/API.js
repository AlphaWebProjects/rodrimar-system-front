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
    return axios.get(`${BASE_URL}/category/alldata`, {headers: { Authorization: `Bearer ${token}`}});
}
function getAllSubCategories(token){
    return axios.get(`${BASE_URL}/subcategory`, {headers: { Authorization: `Bearer ${token}`}});
}
function disableCategory(token, categoryId){
    return axios.put(`${BASE_URL}/category/status/${categoryId}`, {body: 'body'}, {headers: { Authorization: `Bearer ${token}`}});
}
function editCategory(token, body){
    return axios.put(`${BASE_URL}/category`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function createCategory(token, body){
    return axios.post(`${BASE_URL}/category`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function getAllItens(token){
    return axios.get(`${BASE_URL}/itens`, {headers: { Authorization: `Bearer ${token}`}});
}
function editSubCategory(token, body){
    return axios.put(`${BASE_URL}/subcategory`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function disableSubCategory(token, subCategoryId){
    return axios.put(`${BASE_URL}/subcategory/status/${subCategoryId}`, {body: 'body'}, {headers: { Authorization: `Bearer ${token}`}});
}
function addSubCategory(token, body){
    return axios.post(`${BASE_URL}/subcategory`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function getAllInsertedItens(token){
    return axios.get(`${BASE_URL}/insertItem`, {headers: { Authorization: `Bearer ${token}`}});
}

const api = {
    CreateSession,
    LogoutSession,
    CreateUser,
    CreateImage,
    getAllCategories,
    getAllSubCategories,
    disableCategory,
    editCategory,
    createCategory,
    getAllItens,
    editSubCategory,
    disableSubCategory,
    addSubCategory,
    getAllInsertedItens
};

export default api;
