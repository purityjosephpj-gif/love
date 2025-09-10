'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, Users, FileText, DollarSign, Clock, CheckCircle } from 'lucide-react'

export default function Analytics() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    completedRequests: 0,
    pendingRequests: 0,
    totalRevenue: 0,
    activeEmployees: 0,
    responseTime: 0
  })

  const [requestsData, setRequestsData] = useState<any[]>([])
  const [serviceData, setServiceData] = useState<any[]>([])

  useEffect(() => {
    calculateStats()
    generateChartData()
  }, [])

  const calculateStats = () => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const employees = JSON.parse(localStorage.getItem('employees') || '[]')

    const totalRequests = requests.length
    const completedRequests = requests.filter((r: any) => r.status === 'Completed').length
    const pendingRequests = requests.filter((r: any) => r.status === 'Pending').length
    const activeEmployees = employees.filter((e: any) => e.status === 'Active').length

    setStats({
      totalRequests,
      completedRequests,
      pendingRequests,
      totalRevenue: completedRequests * 500, // Estimated revenue
      activeEmployees,
      responseTime: 2.5 // Average hours
    })
  }

  const generateChartData = () => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')

    // Requests over time (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const requestsOverTime = last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en', { weekday: 'short' }),
      requests: requests.filter((r: any) => r.createdAt.split('T')[0] === date).length
    }))

    // Service distribution
    const serviceCounts: { [key: string]: number } = {}
    requests.forEach((r: any) => {
      serviceCounts[r.serviceType] = (serviceCounts[r.serviceType] || 0) + 1
    })

    const serviceDistribution = Object.entries(serviceCounts).map(([service, count]) => ({
      name: service,
      value: count
    }))

    setRequestsData(requestsOverTime)
    setServiceData(serviceDistribution)
  }

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests,
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Completed',
      value: stats.completedRequests,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending',
      value: stats.pendingRequests,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Active Team',
      value: stats.activeEmployees,
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Revenue (KES)',
      value: `${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'Avg Response',
      value: `${stats.responseTime}h`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
    }
  ]

  const COLORS = ['#8B0000', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Requests Over Time */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Requests This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#8B0000" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Request Status Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Request Status Overview</h3>
        <div className="grid md:grid-cols-6 gap-4">
          {['Pending', 'In Review', 'Assigned', 'In Progress', 'Completed', 'Cancelled'].map((status) => {
            const requests = JSON.parse(localStorage.getItem('requests') || '[]')
            const count = requests.filter((r: any) => r.status === status).length
            const percentage = stats.totalRequests > 0 ? (count / stats.totalRequests * 100).toFixed(1) : '0'
            
            return (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-primary-red">{count}</div>
                <div className="text-sm text-gray-600">{status}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}