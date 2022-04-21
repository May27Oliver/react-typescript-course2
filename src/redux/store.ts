import {createStore } from 'redux';
import languageReducer from "./language/languageReducer";

const store = createStore(languageReducer);//createStore第一個參數必須給予reducer。

export type RootState = ReturnType<typeof store.getState> //ReturnType可以從函式反向獲得類型

export default store;

// import {createStore} from 'redux';
// import languageReducer from './language/languageReducer';

// const store = createStore(languageReducer);

// export default store;