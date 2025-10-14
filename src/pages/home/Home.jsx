import React, { useEffect } from 'react'
import { axiosClient } from '../../utils/axiosClient';
import Navbar from '../../components/navbar/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/slices/appConfigSlice';

function Home() {
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getMyInfo());
    },[])
  return(
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
  
}

export default Home