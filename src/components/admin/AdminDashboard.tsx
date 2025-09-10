'use client'
import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import RequestsManagement from './RequestsManagement'
import EmployeesManagement from './EmployeesManagement'
import Analytics from './Analytics'
import Settings from './Settings'
import Messaging from './Messaging'
import Reports from './Reports'
import AuditLogs from './AuditLogs'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Initialize default settings
  useEffect(() => {
    const settings = localStorage.getItem('adminSettings')
    if (!settings) {
      const defaultSettings = {
        companyName: 'QuickLink Services',
        contactPhone: '0111679286',
        contactEmail: 'info@quicklinkservices.com',
        mpesaPaybill: '123456',
        mpesaTill: '654321',
        serviceArea: 'Nairobi & Surrounding Areas'
      }
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings))
    }
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'requests':
        return <RequestsManagement />
      case 'employees':
        return <EmployeesManagement />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      case 'messaging':
        return <Messaging />
      case 'reports':
        return <Reports />
      case 'audit':
        return <AuditLogs />
      default:
        return <Analytics />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader onLogout={onLogout} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}