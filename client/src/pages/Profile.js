import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getUserInfo} from '../slices/userSlice'
const Profile = () => {
  const dispatch=useDispatch();
  useEffect(() => {
      dispatch(getUserInfo())
  }, [dispatch]);
 return(<div>Profile</div>)
}

export default Profile