'use client'
import { useState, useEffect } from 'react'
import { Search, Filter, Download, Eye, Edit, Check, X, User } from 'lucide-react'
import * as XLSX from 'xlsx'

export default function RequestsManagement() {
  const [requests, setRequests] = useState<any[]>([])
  const [filteredRequests, setFilteredRequests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, statusFilter])

  const loadRequests = () => {
    const storedRequests = JSON.parse(localStorage.getItem('requests') || '[]')
    setRequests(storedRequests)
  }

  const filterRequests = () => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phone.includes(searchTerm) ||
        request.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter)
    }

    setFilteredRequests(filtered)
  }

  const updateRequestStatus = (requestId: string, newStatus: string) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus, [`${newStatus.toLowerCase().replace(' ', '')}At`]: new Date().toISOString() }
        : request
    )
    
    setRequests(updatedRequests)
    localStorage.setItem('requests', JSON.stringify(updatedRequests))
    
    // Add to audit log
    const auditLog = {
      id: `audit-${Date.now()}`,
      action: 'Request Status Updated',
      details: `Request ${requestId} status changed to ${newStatus}`,
      user: 'Admin User',
      timestamp: new Date().toISOString()
    }
    
    const auditLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    auditLogs.unshift(auditLog)
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs))
  }

  const verifyPayment = (requestId: string) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId 
        ? { ...request, paymentStatus: 'Paid', verifiedAt: new Date().toISOString() }
        : request
    )
    
    setRequests(updatedRequests)
    localStorage.setItem('requests', JSON.stringify(updatedRequests))
  }

  const exportToExcel = () => {
    const exportData = filteredRequests.map(request => ({
      'Request ID': request.id,
      'Name': request.name,
      'Phone': request.phone,
      'Email': request.email,
      'Service': request.serviceType,
      'Title': request.title,
      'Status': request.status,
      'Payment Status': request.paymentStatus || 'Pending',
      'Created Date': new Date(request.createdAt).toLocaleDateString(),
      'Pickup Location': request.pickupLocation || 'N/A',
      'Dropoff Location': request.dropoffLocation || 'N/A'
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Requests')
    XLSX.writeFile(wb, `requests-export-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'In Review': return 'bg-blue-100 text-blue-800'
      case 'Assigned': return 'bg-purple-100 text-purple-800'
      case 'In Progress': return 'bg-orange-100 text-orange-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Requests Management</h2>
        <button 
          onClick={exportToExcel}
          className="btn-primary flex items-center space-x-2"
        >
          <Download size={16} />
          <span>Export Excel</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredRequests.length} of {requests.length} requests
            </span>
            <Filter className="text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.id}</div>
                      <div className="text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-primary-red rounded-full p-2 mr-3">
                        <User className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.title}</div>
                    <div className="text-sm text-gray-500">{request.serviceType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        request.paymentStatus === 'Pending Verification' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.paymentStatus || 'Pending'}
                      </span>
                      {request.paymentStatus === 'Pending Verification' && (
                        <button
                          onClick={() => verifyPayment(request.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Verify Payment"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request)
                          setShowModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      
                      <select
                        value={request.status}
                        onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Detail Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Request Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">ID:</span> {selectedRequest.id}</p>
                    <p><span className="font-medium">Title:</span> {selectedRequest.title}</p>
                    <p><span className="font-medium">Service:</span> {selectedRequest.serviceType}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                    <p><span className="font-medium">Description:</span></p>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedRequest.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedRequest.name}</p>
                    <p><span className="font-medium">Phone:</span> {selectedRequest.phone}</p>
                    <p><span className="font-medium">Email:</span> {selectedRequest.email}</p>
                    {selectedRequest.pickupLocation && (
                      <p><span className="font-medium">Pickup:</span> {selectedRequest.pickupLocation}</p>
                    )}
                    {selectedRequest.dropoffLocation && (
                      <p><span className="font-medium">Drop-off:</span> {selectedRequest.dropoffLocation}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}