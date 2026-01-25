import Home from './Pages/Home'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import UserDashboard from './Pages/user/UserDashboard'

function App() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  )
  
  const router =createBrowserRouter([
    {
    path:"/" ,
    element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },

    {
      path: '/dashboard',
      element: isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />,
    },
    {
      path: '/dashboard/my-bookings',
      element: isAuthenticated ? <UserBookings /> : <Navigate to="/login" />,
    },
    {
      path: '/dashboard/user-profile',
      element: isAuthenticated ? <UserProfile /> : <Navigate to="/login" />,
    },
    {
      path: '/payments',
      element: isAuthenticated ? <Payments /> : <Navigate to="/login" />,
    },
    {
      path: '/user/support-tickets',
      element: isAuthenticated ? <UserSupportTickets /> : <Navigate to="/login" />,
    },
  ])
  return <RouterProvider router ={router}/>
}

export default App
