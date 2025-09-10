'use client'
import { Menu, LogOut, Bell, User } from 'lucide-react'

interface AdminHeaderProps {
  onLogout: () => void
  setSidebarOpen: (open: boolean) => void
}

export default function AdminHeader({ onLogout, setSidebarOpen }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-primary-red rounded-full p-2">
              <User className="text-white" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">administrator</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}