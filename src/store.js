import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
//const cookies = new Cookies();
//const storageState=cookies.get('reef_chinuch_orders') ? cookies.get('reef_chinuch_orders'):[];
const store = createStore(rootReducer,
     //storageState,
     composeWithDevTools(
    applyMiddleware(...middleware),
));
 store.subscribe( () => {
    //cookies.set('reef_chinuch_orders', JSON.stringify(store.getState()));
}); 

export default store