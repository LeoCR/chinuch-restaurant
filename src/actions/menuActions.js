import {FETCH_MAIN_COURSES,FETCH_APPETIZERS,
    FETCH_DESSERTS,FETCH_DRINKS,FETCH_DRINK,
    FETCH_DISH,FETCH_INGREDIENTS
} from "../constants/menuTypes";
import api from "../apis/api";

export const fetchDish=id=>async dispatch=>{
    return await api.get('/api/dish/show/'+id)
    .then((res)=>{
        dispatch({
            type:FETCH_DISH,
            payload:res.data
        });
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchDish()");
        console.log(err);
    })
}
export const fetchDrink=id=>async dispatch=>{
    return await api.get('/api/drink/show/'+id)
    .then((res)=>{
        dispatch({
            type:FETCH_DRINK,
            payload:res.data
        });
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchDrink()");
        console.log(err);
    })
    
}
export const fetchMainCourses=()=>async dispatch=>{
    return await api.get('/api/get/main-courses')
    .then((res)=>{
        dispatch({
            type:FETCH_MAIN_COURSES,
            payload:res.data
        });
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchMainCourses()");
        console.log(err);
    })
}
export const fetchAppetizers=()=>async dispatch=>{
    return await api.get('/api/get/appetizers')
    .then((res)=>{
        dispatch({
            type:FETCH_APPETIZERS,
            payload:res.data
        });
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchAppetizers()");
        console.log(err);
    })
}
export const fetchDesserts=()=>async dispatch=>{
    return await api.get('/api/get/desserts')
    .then((res)=>{
        dispatch({
            type:FETCH_DESSERTS,
            payload:res.data
        });
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchDesserts()");
        console.log(err);
    })
}
export const fetchDrinks=()=>async dispatch=>{
    return await api.get('/api/get/drinks')
    .then((res)=>{
        dispatch({
            type:FETCH_DRINKS,
            payload:res.data
        });
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchDrinks()");
        console.log(err);
    })
}
export const fetchIngredients=(id)=>async dispatch=>{
    return await api.get('/api/dish/ingredients/'+id)
    .then((res)=>{
        dispatch({
            type:FETCH_INGREDIENTS,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log("An error occurs in menuActions.fetchIngredients()");
        console.log(err);
    })
}