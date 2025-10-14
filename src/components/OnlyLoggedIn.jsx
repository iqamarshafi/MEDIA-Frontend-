import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorageManager'

function OnlyLoggedIn() {
  const userAccess = getItem(KEY_ACCESS_TOKEN)
  return (
    userAccess? <Navigate to='/'/> : <Outlet/>  )
}

export default OnlyLoggedIn