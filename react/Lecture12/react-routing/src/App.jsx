
import { Children } from 'react';
import './App.css'
import {Home,About,Contact,Header,Footer,Layout} from './components'

import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router=createBrowserRouter([
  {
  path:'/',
  element:<Layout />,
  children:[
    {
      path:'',
      element:<Home />
    },
    {
      path:'about',
      element:<About />
    },
    {
      path:'contact',
      element:<Contact />
    }
  ]
}
])

function App() {
 

  return (
    <>
    <RouterProvider router={router} />
    </>
   )
}

export default App;
