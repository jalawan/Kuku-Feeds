import { LogIn, LogOut } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { clearCredentials } from '../Features/slice/authSlice'

 const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  )

  //  Logout
  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate('/login')
  }

  // Role-based dashboard redirect
  const handleDashboardClick = () => {
    if (user?.role === 'ADMIN') {
      navigate('/admin/dashboard')
    // } else if (user?.role === 'staff') {
    //   navigate('/staff/dashboard')
    } else {
      navigate('/dashboard')
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         <li><a href='#Home'>Home</a></li>
          <li><a href='#about'>About</a></li>
          <li><a href='#feeds'>Feeds</a></li>
          <li><a href='#contact'>Contact</a></li>
          {isAuthenticated && (
              <button onClick={handleDashboardClick} className="navbar-link text-left">
                Dashboard
              </button>
          )}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl text-shadow-red-500">  Trinity Feeds </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-shadow-red-500">
      <li><a href='#Home'>Home</a></li>
      <li><a href='#about'>About</a></li>
      <Link to="/feeds"><li><a href='#feeds'>Feeds</a></li></Link>
      <li><a href='#contact'>Contact</a></li>
      
      {isAuthenticated && (
              <button onClick={handleDashboardClick} className="navbar-link text-left">
                Dashboard
              </button>
          )}
    </ul>
  </div>
  <div className="navbar-end">
     {isAuthenticated && user ? (
          <>
            {/* USER INITIALS */}
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
              {user.first_name && user.last_name
                ? `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`
                : "U"}
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center text-950 hover:text-gray-300"
            >
              <LogOut color="#318c18" className="mr-2" />
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn bg-black-100  rounded-3xl hover:bg-black-900 text-black border-black-900 hover:border-black-900 px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              Log In <LogIn/>
            </button>
          </Link>
        )}
  </div>
</div>
  )
}
export default Navbar;