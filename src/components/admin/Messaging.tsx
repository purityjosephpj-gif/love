'use client'
import { useState } from 'react'
import { Send, MessageCircle, Users, User } from 'lucide-react'

export default function Messaging() {
  const [messageType, setMessageType] = useState('broadcast')
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [platform, setPlatform] = useState('whatsapp')
  const [isSent, setIsSent] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate sending message
    console.log('Sending message:', {
      type: messageType,
      recipient,
      subject,
      message,
      platform
    })

    // Add to audit log
    const auditLog = {
      id: `audit-${Date.now()}`,
      action: 'Message Sent',
      details: `${messageType} message sent via ${platform}${recipient ? ` to ${recipient}` : ' to all users'}`,
      user: 'Admin User',
      timestamp: new Date().toISOString()
    }
    
    const auditLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    auditLogs.unshift(auditLog)
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs))

    setIsSent(true)
    setTimeout(() => {
      setIsSent(false)
      setSubject('')
      setMessage('')
      setRecipient('')
    }, 3000)
  }

  const templates = [
    {
      title: 'Request Assigned',
      content: 'Your request {{requestId}} has been assigned to our team. We will contact you shortly with updates.'
    },
    {
      title: 'Service Completed',
      content: 'Your service request {{requestId}} has been completed successfully. Thank you for choosing QuickLink Services!'
    },
    {
      title: 'Payment Reminder',
      content: 'This is a friendly reminder that payment is pending for request {{requestId}}. Please use your Request ID as the reference number.'
    }
  ]

  if (isSent) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
          <p className="text-gray-600">Your message has been sent successfully.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Messaging & Notifications</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message Composer */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSend} className="bg-white rounded-lg shadow p-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Compose Message</h3>

            {/* Message Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="broadcast"
                    checked={messageType === 'broadcast'}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="text-primary-red focus:ring-primary-red"
                  />
                  <Users className="ml-2 mr-1" size={16} />
                  <span className="text-sm">Broadcast</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="individual"
                    checked={messageType === 'individual'}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="text-primary-red focus:ring-primary-red"
                  />
                  <User className="ml-2 mr-1" size={16} />
                  <span className="text-sm">Individual</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="group"
                    checked={messageType === 'group'}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="text-primary-red focus:ring-primary-red"
                  />
                  <Users className="ml-2 mr-1" size={16} />
                  <span className="text-sm">Group</span>
                </label>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="sms">SMS</option>
                <option value="email">Email</option>
                <option value="push">Push Notification</option>
              </select>
            </div>

            {/* Recipient */}
            {messageType === 'individual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Phone number or email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Subject */}
            {platform === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Message subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  required={platform === 'email'}
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Templates */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Message Templates</h3>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.content}</p>
                  <button
                    onClick={() => setMessage(template.content)}
                    className="text-primary-red text-sm hover:text-red-700"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Messages Sent Today</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">WhatsApp Delivery Rate</span>
                <span className="font-medium text-green-600">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">SMS Delivery Rate</span>
                <span className="font-medium text-blue-600">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}