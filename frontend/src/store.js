   // store.js
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import rootReducer from './reducers/authReducer';

const store = configureStore({ reducer: rootReducer }); // Create the store


export default store; 
