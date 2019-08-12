import {FETCH_MAIN_COURSES,FETCH_APPETIZERS,
    FETCH_DESSERTS,FETCH_DRINKS,FETCH_DRINK,
    FETCH_DISH,FETCH_INGREDIENTS
} from "../constants/menuTypes";
import api from "../apis/api";

export const fetchDish=id=>async dispatch=>{
    const response = await api.get('/api/dish/show/'+id);
    dispatch({
        type:FETCH_DISH,
        payload:response.data
    });
}
export const fetchDrink=id=>async dispatch=>{
    const response = await api.get('/api/drink/show/'+id)
    dispatch({
        type:FETCH_DRINK,
        payload:response.data
    });
}
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
export const fetchIngredients=(id)=>async dispatch=>{
    const response = await api.get(`/api/dish/ingredients/${id}`);
    dispatch({
        type:FETCH_INGREDIENTS,
        payload:response.data
    })
}