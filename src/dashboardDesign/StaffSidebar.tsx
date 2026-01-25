import { ShoppingCart, NotebookIcon, Ticket, LogOut } from 'lucide-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

const StaffSidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/staff/dashboard',
      icon: <ShoppingCart />
    },
    {
      name: 'All Bookings',
      path: '/staff/dashboard/all-bookings',
      icon: <ShoppingCart />
    },
    {
      name: 'All Payments',
      path: '/staff/dashboard/payments',
      icon: <NotebookIcon />
    },
    {
      name: 'Support Tickets',
      path: '/staff/support-tickets',
      icon: <Ticket />
    }
  ]

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-black shadow-sm transition-all duration-300 w-64 fixed left-0 top-23 z-40">
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-amber-500">
            Staff Panel
          </h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2 flex-1">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-100 hover:text-amber-700'
            }`}
          >
            <span className="shrink-0 mr-3">
              {item.icon}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <span className="mr-3">
            <LogOut />
          </span>
          Logout
        </button>
      </div>

    </div>
  )
}

export default StaffSidebar
