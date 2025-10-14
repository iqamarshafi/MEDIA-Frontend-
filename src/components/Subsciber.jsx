import React from 'react'
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorageManager'
import { Navigate, Outlet } from 'react-router-dom';

function Subsciber() {
    const userAccess = getItem(KEY_ACCESS_TOKEN);

  return (
    userAccess? <Outlet/>: <Navigate to='/login'/>
  )
}

export default Subsciber