import { useEffect, useState } from 'react'
import authservice from './appwrite/auth'
import {useDispatch} from 'react-redux'
import './App.css'
import {login,logout} from './app/features/authSlice'
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    authservice.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login(userData));
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=>{
        setLoading(false);
      })
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>

     
        
        <div className='w-full block'>
            <Header />

             <main>
                TODO:  <Outlet />
              </main>

            <Footer />
        </div>

    </div>
) : null;
}

export default App
