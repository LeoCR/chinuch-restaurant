import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk];
//const storageState = localStorage.getItem('reefChinuchRestaurant') ? JSON.parse(localStorage.getItem('reefChinuchRestaurant')) : [];

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
));
/* store.subscribe( () => {
    localStorage.setItem('reefChinuchRestaurant', JSON.stringify(store.getState()))
}); */

export default store