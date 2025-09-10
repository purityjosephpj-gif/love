'use client'
import { useState, useEffect } from 'react'
import { Save, Phone, Mail, MapPin, CreditCard } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: '',
    contactPhone: '',
    contactEmail: '',
    serviceArea: '',
    mpesaPaybill: '',
    mpesaTill: '',
    notificationEmail: '',
    autoAssign: false,
    emailNotifications: true,
    smsNotifications: true
  })
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    const storedSettings = localStorage.getItem('adminSettings')
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('adminSettings', JSON.stringify(settings))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)

    // Add to audit log
    const auditLog = {
      id: `audit-${Date.now()}`,
      action: 'Settings Updated',
      details: 'Admin settings were updated',
      user: 'Admin User',
      timestamp: new Date().toISOString()
    }
    
    const auditLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    auditLogs.unshift(auditLog)
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        {isSaved && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            Settings saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Phone className="mr-2" size={20} />
            Company Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="QuickLink Services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="0111679286"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="info@quicklinkservices.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Area
              </label>
              <input
                type="text"
                name="serviceArea"
                value={settings.serviceArea}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="Nairobi & Surrounding Areas"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <CreditCard className="mr-2" size={20} />
            Payment Settings
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Paybill Number
              </label>
              <input
                type="text"
                name="mpesaPaybill"
                value={settings.mpesaPaybill}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="123456"
              />
              <p className="text-sm text-gray-500 mt-1">
                Customers will use their Request ID as the account number
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Till Number
              </label>
              <input
                type="text"
                name="mpesaTill"
                value={settings.mpesaTill}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="654321"
              />
              <p className="text-sm text-gray-500 mt-1">
                Alternative payment method for customers
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Mail className="mr-2" size={20} />
            Notification Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Email
              </label>
              <input
                type="email"
                name="notificationEmail"
                value={settings.notificationEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="admin@quicklinkservices.com"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="autoAssign"
                  id="autoAssign"
                  checked={settings.autoAssign}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary-red focus:ring-primary-red"
                />
                <label htmlFor="autoAssign" className="ml-2 text-sm text-gray-700">
                  Auto-assign requests to available service providers
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary-red focus:ring-primary-red"
                />
                <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
                  Send email notifications for new requests
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary-red focus:ring-primary-red"
                />
                <label htmlFor="smsNotifications" className="ml-2 text-sm text-gray-700">
                  Send SMS notifications to customers
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  )
}