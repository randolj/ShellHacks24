import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
// import './App.css'
import Login from  './Components/Login/Login.jsx'
import SignUp from './Components/SignUp/SignUp.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element:
        <div>
        </div>
    },
    {
      path: "/signup",
      element:
        <div>
          <SignUp/>
        </div>
    },
    {
      path: "/login",
      element:
        <div>
          <Login/>
        </div>
    },
  ])
  
  function App() {
    const [data, setData] = useState(null);
    return (
        <RouterProvider router={router} />
    )
  }
  
  export default App