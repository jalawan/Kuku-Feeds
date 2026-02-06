import Home from './Pages/Home'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import Booking from './Pages/user/Bookings'
import UserDashboard from './Pages/user/UserDashboard'
import AdminDashboard from './Pages/admin/AdminDasboard'
import AllBookings from './Pages/admin/AllBookings'
import UserBookings from './Pages/user/Bookings'
import UserProfile from './Pages/user/UserProfile'
import UserPayments from './Pages/user/Payments'
import UserSupportTickets from './Pages/user/UserSupportTickets'
import AllCustomers from './Pages/admin/AllCustomers'
import AllFeeds from './Pages/admin/AllFeeds'
import AddFeed from './Pages/admin/AddFeed'
import AdminReports from './Pages/admin/AdminReports'
import AdminSettings from './Pages/admin/AddSettings'
import AddFeedDescription from './Pages/admin/AddDescription'
import AdminSupportTickets from './Pages/admin/AllSupportTickets'
import Feeds from './Pages/Feeds'
import FeedDescription from './Pages/feedDesc'

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
      path:"/feeds",
      element:<Feeds/>
    },
     {
      path:"/feedDesc/:feed_id",
      element:<FeedDescription/>
    },
    {
      path:"/booking",
      element:<Booking/>
    },
// USER DASHBOARD
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
      element: isAuthenticated ? <UserPayments /> : <Navigate to="/login" />,
    },
    {
      path: '/user/support-tickets',
      element: isAuthenticated ? <UserSupportTickets /> : <Navigate to="/login" />,
    },

    // ADMIN DASHBOARD
    {
      path:'/admin/dashboard',
      element: isAuthenticated? <AdminDashboard/>: <Navigate to="/login"/>,
    },
    {
      path: '/dashboard/my-bookings',
      element: isAuthenticated ? <AllBookings /> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/my-customers',
      element: isAuthenticated ? <AllCustomers/> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/my-feeds',
      element: isAuthenticated ? <AllFeeds /> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/feeds',
      element: isAuthenticated ? <AddFeed/> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/reports',
      element: isAuthenticated ? <AdminReports /> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/aettings',
      element: isAuthenticated ? <AdminSettings /> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/foodDesc',
      element: isAuthenticated ? <AddFeedDescription /> : <Navigate to="/login" />,
    },
     {
      path: '/dashboard/Support_tickets',
      element: isAuthenticated ? <AdminSupportTickets /> : <Navigate to="/login" />,
    },

  ])
  return <RouterProvider router ={router}/>
}

export default App
