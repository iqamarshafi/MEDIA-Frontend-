
import { useSelector } from 'react-redux'
import Feed from './components/feed/Feed'
import Profile from './components/profile/Profile'
import Subsciber from './components/Subsciber'
import UpdateProfile from './components/updateProfile/UpdateProfile'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import { Route,Routes } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import LoadingBar from "react-top-loading-bar";
import OnlyLoggedIn from './components/OnlyLoggedIn'
import toast, { Toaster } from 'react-hot-toast';
import store from './redux/store'
import { injectStore } from './utils/axiosClient'


  export const TOAST_SUCCESS= 'toast_success';
  export const TOAST_FALIURE= 'toast_failure';

function App() {


  const loadingRef = useRef(null);
  const isLoading = useSelector(state => state.appConfigReducer.isLoading);
  const toastData = useSelector(state => state.appConfigReducer.toastData);
  injectStore(store);

  useEffect(()=>{
    if(isLoading){
       loadingRef.current?.continuousStart();
    } else{
       loadingRef.current?.complete();
    }   
  },[isLoading])
   useEffect(()=>{
    
    switch (toastData.type) {
      case TOAST_SUCCESS:
          toast.success(toastData.message)
        break;
      case TOAST_FALIURE:
          toast.error(toastData.message)
         break;       
                   
    }
   },[toastData])

  return (
   <>
   <LoadingBar color="#5f9fff" ref={loadingRef} shadow={true} />
   <div><Toaster/></div>
    <Routes>

      <Route element={<Subsciber/>}>
        <Route element={<Home/>} >
            <Route index element={<Feed/>} />
            <Route path="/profile/:userId" element={<Profile/>} />
            <Route path="/updateProfile" element={<UpdateProfile/>  } />
        </Route>
      </Route>
      <Route element={<OnlyLoggedIn/>}>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      </Route>
    </Routes>
   </>
  )
}

export default App
