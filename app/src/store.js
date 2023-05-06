import { combineReducers, legacy_createStore as createStore } from 'redux';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    app: appReducer,
});

const store = createStore(rootReducer);

export default store;