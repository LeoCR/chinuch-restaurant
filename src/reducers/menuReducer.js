import {FETCH_MAIN_COURSES,FETCH_APPETIZERS,FETCH_DRINK,
    FETCH_DESSERTS,FETCH_DRINKS,FETCH_DISH,FETCH_INGREDIENTS} from "../constants/menuTypes";
export default (state={},action)=>{
    switch(action.type){
        case FETCH_MAIN_COURSES:
        return {
            ...state,
            mainCourses: action.payload
        }
        case FETCH_APPETIZERS:
            return {
                ...state,
                appetizers:action.payload
            }
        case FETCH_DESSERTS:
            return{
                ...state,
                desserts:action.payload
            }
        case FETCH_DRINKS:
            return{
                ...state,
                drinks:action.payload
            }
        case FETCH_DISH:
            return {
                ...state,
                dish:action.payload
            }
        case FETCH_DRINK:
            return {
                ...state,
                drink:action.payload
            }
        case FETCH_INGREDIENTS:
            return{
                ...state,
                ingredients:action.payload
            }
        default:
            return state;
    }
}