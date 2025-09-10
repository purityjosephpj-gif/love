'use client'
import { useState, useEffect } from 'react'
import { Search, Shield, Calendar, User, FileText } from 'lucide-react'

export default function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    loadAuditLogs()
  }, [])

  const loadAuditLogs = () => {
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    
    // Add some default audit logs if none exist
    if (logs.length === 0) {
      const defaultLogs = [
        {
          id: 'audit-001',
          action: 'Admin Login',
          details: 'Admin user logged into the system',
          user: 'Admin User',
          timestamp: new Date().toISOString(),
          ip: '192.168.1.1'
        },
        {
          id: 'audit-002',
          action: 'Settings Updated',
          details: 'Payment settings were modified',
          user: 'Admin User',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          ip: '192.168.1.1'
        }
      ]
      localStorage.setItem('auditLogs', JSON.stringify(defaultLogs))
      setAuditLogs(defaultLogs)
    } else {
      setAuditLogs(logs)
    }
  }

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDate = dateFilter === '' || 
      new Date(log.timestamp).toISOString().split('T')[0] === dateFilter

    return matchesSearch && matchesDate
  })

  const getActionIcon = (action: string) => {
    if (action.includes('Login') || action.includes('Logout')) return User
    if (action.includes('Settings')) return Shield
    if (action.includes('Request')) return FileText
    return Shield
  }

  const getActionColor = (action: string) => {
    if (action.includes('Login')) return 'text-green-600'
    if (action.includes('Logout')) return 'text-red-600'
    if (action.includes('Update') || action.includes('Settings')) return 'text-blue-600'
    if (action.includes('Delete') || action.includes('Cancel')) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Shield size={16} />
          <span>All activities are logged for security and compliance</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredLogs.length} of {auditLogs.length} logs
            </span>
            <button
              onClick={() => {
                setSearchTerm('')
                setDateFilter('')
              }}
              className="text-primary-red text-sm hover:text-red-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Activity Log</h3>
        </div>

        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <Shield className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No audit logs found</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const ActionIcon = getActionIcon(log.action)
              const actionColor = getActionColor(log.action)
              
              return (
                <div key={log.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${actionColor}`}>
                      <ActionIcon size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${actionColor}`}>
                          {log.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {log.details}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          User: {log.user}
                        </span>
                        {log.ip && (
                          <span className="text-xs text-gray-500">
                            IP: {log.ip}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          ID: {log.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
            </div>
            <FileText className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Today</p>
              <p className="text-2xl font-bold text-blue-600">
                {auditLogs.filter(log => 
                  new Date(log.timestamp).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <Calendar className="text-blue-400" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Users</p>
              <p className="text-2xl font-bold text-green-600">
                {new Set(auditLogs.map(log => log.user)).size}
              </p>
            </div>
            <User className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Security</p>
              <p className="text-2xl font-bold text-red-600">100%</p>
            </div>
            <Shield className="text-red-400" size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}