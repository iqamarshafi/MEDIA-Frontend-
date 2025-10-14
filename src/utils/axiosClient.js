import axios from 'axios'
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorageManager'

import { showToast } from '../redux/slices/appConfigSlice'
import { TOAST_FALIURE } from '../App'

let reduxStore; // store reference will be set later

export const injectStore = store => {
    reduxStore = store;
};
export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    withCredentials: true
}
)



axiosClient.interceptors.request.use(
    (request)=>{
        console.log('enter request intercepter')

        const isAuth = request.url.includes('/auth/login') || request.url.includes('/auth/signup')||request.url.includes('/auth/refresh');
        
        if(!isAuth){
            const accessToken = getItem(KEY_ACCESS_TOKEN);
        
        console.log('access token : ' , accessToken);


        request.headers['Authorization'] = `Bearer ${accessToken}`;
        }
   
         console.log('request: ' , request)
         console.log('exit interceptor')
        return request;
    }
)

axiosClient.interceptors.response.use(
    async (response)=>{
        const data = response.data;
        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.errMsg;
        console.log('enter response interceptor', response)
        
      
        if(data.status === 'ok'){
            return response;
        }

        if(reduxStore){
            reduxStore.dispatch(showToast({
            type: TOAST_FALIURE,
            message: error
        }))
        }
         
        //when refresh token expired send user to login page
        if(statusCode === 401 && originalRequest.url == `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`){
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login','_self');
            return Promise.reject(error);
        }  

        if(statusCode ===401){
            const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,{withCredentials: true});
            

            console.log('response from backend: ', response)
            
            

            if(response.data.status ==='ok'){
                console.log('new access token: ',response.data.result.accessToken)
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)
                // console.log('new access token: ',response.data.result.accessToken)
                originalRequest.headers['Authorization'] =`Bearer ${response.data.result.accessToken}`
                console.log('original : ' , originalRequest);

                return axios(originalRequest); 
            }else{
                 removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login','_self');
            return Promise.reject(error);
            }
            
               
        } 

        return  Promise.reject(error);
    } , async (error)=>{
            if(reduxStore){
            reduxStore.dispatch(showToast({
            type: TOAST_FALIURE,
            message: error
        }))
        }
            return  Promise.reject(error);                                                                        
        }    
)