'use client'
import { useState } from 'react'
import { Download, Calendar, FileText, DollarSign } from 'lucide-react'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [reportType, setReportType] = useState('requests')

  const generateExcelReport = () => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const employees = JSON.parse(localStorage.getItem('employees') || '[]')
    
    let data: any[] = []
    
    if (reportType === 'requests') {
      data = requests
        .filter((r: any) => {
          const reqDate = new Date(r.createdAt).toISOString().split('T')[0]
          return reqDate >= dateRange.startDate && reqDate <= dateRange.endDate
        })
        .map((r: any) => ({
          'Request ID': r.id,
          'Date': new Date(r.createdAt).toLocaleDateString(),
          'Customer Name': r.name,
          'Phone': r.phone,
          'Email': r.email,
          'Service Type': r.serviceType,
          'Title': r.title,
          'Status': r.status,
          'Payment Status': r.paymentStatus || 'Pending',
          'Pickup Location': r.pickupLocation || 'N/A',
          'Dropoff Location': r.dropoffLocation || 'N/A',
          'Created At': new Date(r.createdAt).toLocaleString()
        }))
    } else if (reportType === 'employees') {
      data = employees.map((e: any) => ({
        'Employee ID': e.id,
        'Name': e.name,
        'Email': e.email,
        'Phone': e.phone,
        'Role': e.role,
        'Status': e.status,
        'Created At': new Date(e.createdAt).toLocaleString()
      }))
    }

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, reportType.charAt(0).toUpperCase() + reportType.slice(1))
    XLSX.writeFile(wb, `${reportType}-report-${dateRange.startDate}-to-${dateRange.endDate}.xlsx`)
  }

  const generatePDFReport = () => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const filteredRequests = requests.filter((r: any) => {
      const reqDate = new Date(r.createdAt).toISOString().split('T')[0]
      return reqDate >= dateRange.startDate && reqDate <= dateRange.endDate
    })

    const pdf = new jsPDF()
    
    // Header
    pdf.setFontSize(20)
    pdf.text('QuickLink Services - Report', 20, 20)
    
    pdf.setFontSize(12)
    pdf.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, 20, 35)
    pdf.text(`Date Range: ${dateRange.startDate} to ${dateRange.endDate}`, 20, 45)
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 55)

    // Stats
    const completedCount = filteredRequests.filter((r: any) => r.status === 'Completed').length
    const pendingCount = filteredRequests.filter((r: any) => r.status === 'Pending').length
    const totalRevenue = completedCount * 500 // Estimated

    pdf.text('Summary:', 20, 70)
    pdf.text(`Total Requests: ${filteredRequests.length}`, 30, 80)
    pdf.text(`Completed: ${completedCount}`, 30, 90)
    pdf.text(`Pending: ${pendingCount}`, 30, 100)
    pdf.text(`Estimated Revenue: KES ${totalRevenue.toLocaleString()}`, 30, 110)

    // Request details (first 10)
    pdf.text('Recent Requests:', 20, 130)
    let y = 140
    
    filteredRequests.slice(0, 10).forEach((req: any, index: number) => {
      if (y > 270) { // New page if needed
        pdf.addPage()
        y = 20
      }
      
      pdf.text(`${index + 1}. ${req.id} - ${req.name} - ${req.status}`, 30, y)
      y += 10
    })

    pdf.save(`${reportType}-report-${dateRange.startDate}.pdf`)
  }

  const reportStats = () => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const employees = JSON.parse(localStorage.getItem('employees') || '[]')
    
    const filteredRequests = requests.filter((r: any) => {
      const reqDate = new Date(r.createdAt).toISOString().split('T')[0]
      return reqDate >= dateRange.startDate && reqDate <= dateRange.endDate
    })

    const completedCount = filteredRequests.filter((r: any) => r.status === 'Completed').length
    const pendingCount = filteredRequests.filter((r: any) => r.status === 'Pending').length
    const cancelledCount = filteredRequests.filter((r: any) => r.status === 'Cancelled').length
    
    return {
      totalRequests: filteredRequests.length,
      completedRequests: completedCount,
      pendingRequests: pendingCount,
      cancelledRequests: cancelledCount,
      totalEmployees: employees.length,
      activeEmployees: employees.filter((e: any) => e.status === 'Active').length,
      estimatedRevenue: completedCount * 500
    }
  }

  const stats = reportStats()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Generate Report</h3>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              <option value="requests">Requests Report</option>
              <option value="employees">Employees Report</option>
              <option value="analytics">Analytics Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={generateExcelReport}
              className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>Excel</span>
            </button>
            <button
              onClick={generatePDFReport}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <FileText size={16} />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalRequests}</p>
            </div>
            <FileText className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedRequests}</p>
            </div>
            <FileText className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
            </div>
            <Calendar className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue (KES)</p>
              <p className="text-2xl font-bold text-primary-red">{stats.estimatedRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity Summary</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Request Status Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-medium text-green-600">{stats.completedRequests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-medium text-yellow-600">{stats.pendingRequests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="font-medium text-red-600">{stats.cancelledRequests}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Team Statistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Employees</span>
                <span className="font-medium">{stats.totalEmployees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active</span>
                <span className="font-medium text-green-600">{stats.activeEmployees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Utilization Rate</span>
                <span className="font-medium">85%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Financial Overview</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Revenue</span>
                <span className="font-medium text-primary-red">KES {stats.estimatedRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Order Value</span>
                <span className="font-medium">KES 500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Rate</span>
                <span className="font-medium text-green-600">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}