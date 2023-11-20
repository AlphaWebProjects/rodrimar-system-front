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

//categorias, sub-categorias e itens
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
function insertItemInStock(token, body){
    return axios.post(`${BASE_URL}/insertItem`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function createNewItem(token, body){
    return axios.post(`${BASE_URL}/itens`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function deleteItem(token, body){
    return axios.post(`${BASE_URL}/deletedItem`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function getDeletedItens(token){
    return axios.get(`${BASE_URL}/deletedItem`, {headers: { Authorization: `Bearer ${token}`}});
}
//

//imagens
function getAllImages(token){
    return axios.get(`${BASE_URL}/image`, {headers: { Authorization: `Bearer ${token}`}});
}
//

//placas
function getAllPlates(token){
    return axios.get(`${BASE_URL}/licenseplate`, {headers: { Authorization: `Bearer ${token}`}});
}
function createPlates(token, body){
    return axios.post(`${BASE_URL}/licenseplate`, body, {headers: { Authorization: `Bearer ${token}`}});
}
//

//fornecedores
function createSupplier(token, body){
    return axios.post(`${BASE_URL}/supplier`, body, {headers: { Authorization: `Bearer ${token}`}});
}
function getSuppliers(token){
    return axios.get(`${BASE_URL}/supplier`, {headers: { Authorization: `Bearer ${token}`}});
}
//

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
    getAllInsertedItens,
    insertItemInStock,
    getAllImages,
    createNewItem,
    getAllPlates,
    deleteItem,
    createPlates,
    getDeletedItens,
    createSupplier,
    getSuppliers
};

export default api;
