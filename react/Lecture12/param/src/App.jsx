import { useState } from 'react'
import './App.css'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import User from './User'

function Home(){
  return(
    <>
    <h1>This is Home Page</h1>
    </>
  )
}

function Error(){
  return(
    <>
    <h1>This page contains error</h1>
    </>
  )
}


function Protected({children}){
  const isLogged=true;
  if(!isLogged){
    return <Navigate to='/' />
  }

  return children;

}

function Dashboard(){
  return(
    <>
    <h1>This is dashboard</h1>
    </>
  )
}

async function leetcode({params}) {
 
  const res=await fetch(`https://alfa-leetcode-api.onrender.com/${params.leetcode}`);
  const data=await res.json();
  if(!data.username){

    throw new Error("User Not Found");

  }
  return data;
}

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/dashboard',
    element:
    <Protected>
      <Dashboard />
    </Protected>
  },
  {
    path:'/:leetcode',
    element:<User />,
    errorElement:<Error />,
    loader:leetcode
  }
])

function App() {
  
  

  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}

export default App
