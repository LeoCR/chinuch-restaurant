import {FETCH_MAIN_COURSES,FETCH_APPETIZERS,FETCH_DESSERTS,FETCH_DRINKS} from "../constants/menuTypes";
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
        default:
            return state;
    }
}