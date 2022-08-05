import {Navbar,Container,Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import React from 'react'
import './navbar.css'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../slices/userSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const NavBar = () => {
  const dispatch=useDispatch()
  const logoutHandler =(e)=>{
    e.preventDefault();
    dispatch(logout())
  }
  const {isAuth,userInfo}=useSelector(state =>state.user)
  
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"#F6F6F6"}} variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container">
            <Link to='/'>Accueil</Link>
            {isAuth ?  userInfo.role==="admin" &&(
              <>
            <Link to='/dashbord'>Dashbord</Link>
            <Link to='/profile'>Profile</Link>
            </>
            ):<></>}
            {isAuth ?   ( 
              <>  
              
              <div className="input-group mb-3 ms-auto " >
                <input type="text" className="form-control"  style={{width:"10%"}}/>
                <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
                </div>
              </div>
              
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" className="bi bi-box-arrow-right logout" viewBox="0 0 16 16" onClick={logoutHandler}>
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
                    
          </>
          ): 
          <>
          
          <Link to='/login'>Se connecter</Link>
          <Link to='/register'>S'inscrire</Link>
          <div className="input-group mb-3  ms-auto " >
            <input type="text" className="form-control"  style={{width:"10%"}}/>
            <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
            </div>
          </div>
          </>}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </div>
  )
}

export default NavBar

