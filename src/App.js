import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StudentPage from './pages/StudentPage'
import MainPage from './pages/MainPage'
import UniPage from './pages/UniPage'
import { RouterProvider, Outlet, createBrowserRouter } from 'react-router-dom'
import AnalysisPage from './pages/AnalysisPage'




const Layout = () => {
    return(
      <div>
        <Header/>
        <div className='grid grid-cols-12 sticky '>
            <div className=' col-span-2'>
              <aside className='sticky top-[1px] x-[3]'>
                <Sidebar/>
              </aside>
            </div>  
           <div className=' col-span-10 z-[-1]'>
              <Outlet />
           </div>
        </div>
      </div>
      )
    }
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element: <MainPage/>
      },
      {
        path:'/analysis',
        element: <AnalysisPage/>
      },
      {
        path:'/students',
        element:<StudentPage/>
      },
      {
        path:'/university',
        element:<UniPage/>
      }
    ]
  }
])
const App = () => {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App

