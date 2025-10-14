import {configureStore} from '@reduxjs/toolkit';
import appConfigReducer from './slices/appConfigSlice'
import postsSliceReducer from './slices/postsSlice'
import feedDataReducer from './slices/feedSlice'

export default configureStore({
    reducer:{
        appConfigReducer,
        postsSliceReducer,
        feedDataReducer          
    }
})