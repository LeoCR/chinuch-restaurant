import {FETCH_MAIN_COURSES,FETCH_APPETIZERS,FETCH_DESSERTS,FETCH_DRINKS} from "../constants/menuTypes";
import api from "../apis/api";
export const fetchMainCourses=()=>async dispatch=>{
    const response = await api.get('/api/get/main-courses');
    dispatch({
        type:FETCH_MAIN_COURSES,
        payload:response.data
    });
}
export const fetchAppetizers=()=>async dispatch=>{
    const response = await api.get('/api/get/appetizers');
    dispatch({
        type:FETCH_APPETIZERS,
        payload:response.data
    });
}
export const fetchDesserts=()=>async dispatch=>{
    const response = await api.get('/api/get/desserts');
    dispatch({
        type:FETCH_DESSERTS,
        payload:response.data
    });
}
export const fetchDrinks=()=>async dispatch=>{
    const response = await api.get('/api/get/drinks');
    dispatch({
        type:FETCH_DRINKS,
        payload:response.data
    });
}