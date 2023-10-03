import './App.css';
import {Routes, Route} from 'react-router-dom'
import Buttons from './components/Buttons';
import UserRegistration from './components/UserAuth/UserRegister';
import UserLogin from './components/UserAuth/UserLogin';
import AdminForm from './components/AdminAuth/AdminLogin';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import SimpleHome from './components/UserAuth/SimpleHome';
function App() {
  return (
    
    <div className=" ">
     <h1 className='bg-blue-300 p-7 font-semibold text-4xl text-center text-white'>Firebase Role Based Management </h1>
     <Routes>
      <Route exact path='/' element={<Buttons/>}/>
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute> }/>
      <Route path='/simpleHome' element={<ProtectedRoute><SimpleHome/></ProtectedRoute> }/>

      <Route path='/userRegister' element={<UserRegistration/>} />
      <Route path='/userLogin' element={<UserLogin/>} />
     
      {/* <Route path='/adminLogin' element={ <AdminForm/>} /> */}

     </Routes>
      
    
    </div>
  );
}

export default App;