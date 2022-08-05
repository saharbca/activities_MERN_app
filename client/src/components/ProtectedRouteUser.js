import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import React from 'react'
const ProtectedRouteUser = () => {
  const {isAuth,userInfo}= useSelector(state => state.user)
    return  isAuth && (userInfo.role==='user'  || userInfo.role==='admin') ?  <Outlet/>
    : <Navigate to= '/login'/>
  
};

export default ProtectedRouteUser