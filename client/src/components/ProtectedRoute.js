import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import React from 'react'
const ProtectedRouteAdmin = () => {
  const {isAuth,userInfo}= useSelector(state => state.user)
    return  isAuth && userInfo.role==='admin' ? <Outlet/>
    : <Navigate to= '/login'/>
  
};

export default ProtectedRouteAdmin