'use client'
import { X } from 'lucide-react'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  FileBarChart, 
  Shield 
} from 'lucide-react'
import Logo from '@/components/Logo'

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'requests', label: 'Requests', icon: FileText },
  { id: 'employees', label: 'Team', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'messaging', label: 'Messaging', icon: MessageSquare },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'audit', label: 'Audit Logs', icon: Shield },
]

export default function AdminSidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Logo size={32} />
            <div>
              <h2 className="font-bold text-lg">Admin Portal</h2>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left
                    ${activeTab === item.id 
                      ? 'bg-primary-red text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-primary-gold rounded-lg p-3">
            <p className="text-sm font-medium text-primary-black">QuickLink Services</p>
            <p className="text-xs text-gray-700">Admin Dashboard v1.0</p>
          </div>
        </div>
      </div>
    </>
  )
}