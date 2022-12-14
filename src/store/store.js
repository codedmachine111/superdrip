import {compose, applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blackList:['user'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer,undefined,composedEnhancers);

export const persistor = persistStore(store);