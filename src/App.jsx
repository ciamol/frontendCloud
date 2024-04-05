import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './actions/auth';
import { addUser } from './redux/userSlice';
function App() {
  const userAuth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(true);

  useEffect( ()=>{
     refreshToken()
     .then((response)=>
       dispatch(addUser(response.info))      
     )
     .finally(()=>setIsLoading(false))
     .catch((error)=>console.log(error))
  },[dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoading?(<div>CARGANDO....</div> ):(!!userAuth.id?(<Navigate to="/" />):( <Login />))} />
        <Route path="/" element={isLoading?(<div>CARGANDO...</div>):(!!userAuth.id? (<Home />):(<Navigate to="/login" />))} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

export default App
