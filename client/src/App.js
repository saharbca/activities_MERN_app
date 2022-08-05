import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Dashbord from './pages/Dashbord.js';
import ProtectedRouteAdmin from './components/ProtectedRoute';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import {Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
function App() {
  return (
    <div >
      <NavBar/>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route element={<ProtectedRouteAdmin/>}>
         <Route path='/dashbord' element={<Dashbord/>}/>
         
      </Route>
      <Route element={<ProtectedRouteUser/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
    </Routes>
    </div>
  );
}

export default App;
