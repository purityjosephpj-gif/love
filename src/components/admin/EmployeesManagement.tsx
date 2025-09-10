'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, User, Phone, Mail } from 'lucide-react'

export default function EmployeesManagement() {
  const [employees, setEmployees] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Service Provider',
    status: 'Active'
  })

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = () => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]')
    if (storedEmployees.length === 0) {
      // Add some default employees
      const defaultEmployees = [
        {
          id: 'emp-001',
          name: 'John Doe',
          email: 'john@quicklinkservices.com',
          phone: '0701234567',
          role: 'Driver',
          status: 'Active',
          createdAt: new Date().toISOString()
        },
        {
          id: 'emp-002',
          name: 'Jane Smith',
          email: 'jane@quicklinkservices.com',
          phone: '0701234568',
          role: 'Service Provider',
          status: 'Active',
          createdAt: new Date().toISOString()
        }
      ]
      localStorage.setItem('employees', JSON.stringify(defaultEmployees))
      setEmployees(defaultEmployees)
    } else {
      setEmployees(storedEmployees)
    }
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
      )
      setEmployees(updatedEmployees)
      localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    } else {
      // Add new employee
      const newEmployee = {
        ...formData,
        id: `emp-${Date.now()}`,
        createdAt: new Date().toISOString()
      }
      const updatedEmployees = [...employees, newEmployee]
      setEmployees(updatedEmployees)
      localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Service Provider',
      status: 'Active'
    })
    setEditingEmployee(null)
    setShowModal(false)
  }

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      status: employee.status
    })
    setShowModal(true)
  }

  const handleDelete = (employeeId: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(emp => emp.id !== employeeId)
      setEmployees(updatedEmployees)
      localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800'
      case 'Driver': return 'bg-blue-100 text-blue-800'
      case 'Service Provider': return 'bg-green-100 text-green-800'
      case 'Dispatcher': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary-red rounded-full p-3">
                <User className="text-white" size={24} />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(employee)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{employee.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(employee.role)}`}>
                  {employee.role}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone size={14} />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail size={14} />
                  <span>{employee.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                >
                  <option value="Service Provider">Service Provider</option>
                  <option value="Driver">Driver</option>
                  <option value="Dispatcher">Dispatcher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}