import { BarChart, Clipboard, Dessert,  NotebookIcon, ShoppingCart, Ticket, Users } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const AdminSidebar: React.FC = () => {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const navigationItems = [
        {
            name: 'Analytics',
            path: '/admin/dashboard',
            icon: <BarChart  />
        },
        {
            name: 'All Users',
            path: '/admin/dashboard/all-customers',
            icon: <Users  />
        },
        {
            name: 'All Bookings',
            path: '/admin/dashboard/all-bookings',
            icon: <ShoppingCart  />
        },
        {
            name: 'All My Feeds',
            path: '/admin/dashboard/feeds',
            icon: < Dessert/>
        },
        {
            name: 'All Payments',
            path: '/payments',
            icon: < NotebookIcon />
        },
        {
            name: 'All Support Tickets',
            path: '/admin/support-tickets',
            icon: < Ticket/>
        },
        {
            name: 'Add Feeds',
            path: '/admin/feeds',
            icon: <Clipboard/>,
        },
    
        {
            name: 'Add FeedDescription',
            path: '/admin/FeedDesc',
            icon: <Clipboard/>
        },
        
    ]

    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-black via-zinc-900 to-black shadow-sm transition-all duration-300 w- relative left-0  z-40">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-lg font-bold text-green-800">Admin Panel</h1>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
                {navigationItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                ? 'bg-green-800 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-green-800'
                            }`}
                    >
                        <span className="shrink-0 mr-3">
                            {item.icon}
                        </span>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default AdminSidebar
