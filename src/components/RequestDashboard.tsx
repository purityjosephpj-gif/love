'use client'
import { useState, useEffect } from 'react'
import { ArrowLeft, Clock, User, MapPin, Phone, Mail, DollarSign, CheckCircle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface RequestDashboardProps {
  request: any
  onBack: () => void
}

export default function RequestDashboard({ request, onBack }: RequestDashboardProps) {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    // Load payment settings
    const storedSettings = localStorage.getItem('adminSettings')
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'status-pending'
      case 'In Review': return 'status-pending'
      case 'Assigned': return 'status-in-progress'
      case 'In Progress': return 'status-in-progress'
      case 'Completed': return 'status-completed'
      case 'Cancelled': return 'status-cancelled'
      default: return 'status-pending'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'status-completed'
      case 'Pending Verification': return 'status-pending'
      case 'Pending': return 'status-cancelled'
      default: return 'status-cancelled'
    }
  }

  const handlePaymentConfirmation = () => {
    // Update payment status to "Pending Verification"
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const updatedRequests = requests.map((r: any) => 
      r.id === request.id 
        ? { ...r, paymentStatus: 'Pending Verification', paymentMethod }
        : r
    )
    localStorage.setItem('requests', JSON.stringify(updatedRequests))
    
    setShowPaymentSuccess(true)
    setTimeout(() => setShowPaymentSuccess(false), 3000)
  }

  const timeline = [
    { status: 'Pending', date: new Date(request.createdAt).toLocaleString(), active: true },
    { status: 'In Review', date: request.reviewedAt || 'Pending', active: ['In Review', 'Assigned', 'In Progress', 'Completed'].includes(request.status) },
    { status: 'Assigned', date: request.assignedAt || 'Pending', active: ['Assigned', 'In Progress', 'Completed'].includes(request.status) },
    { status: 'In Progress', date: request.startedAt || 'Pending', active: ['In Progress', 'Completed'].includes(request.status) },
    { status: 'Completed', date: request.completedAt || 'Pending', active: request.status === 'Completed' }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-8 bg-gray-50 min-h-[80vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-primary-red hover:text-red-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Search</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Request Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Request Dashboard</h1>
                    <p className="text-gray-600">Request ID: <span className="font-mono text-primary-red">{request.id}</span></p>
                  </div>
                  <div className="text-right">
                    <span className={`${getStatusColor(request.status)} text-sm`}>
                      {request.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Service:</span> {request.title}</p>
                      <p><span className="text-gray-600">Type:</span> {request.serviceType}</p>
                      <p className="text-sm text-gray-600">{request.description}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-400" />
                        <span>{request.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-400" />
                        <span>{request.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-400" />
                        <span>{request.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {(request.pickupLocation || request.dropoffLocation) && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Locations</h3>
                    <div className="space-y-2">
                      {request.pickupLocation && (
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Pickup</p>
                            <p className="text-gray-600">{request.pickupLocation}</p>
                          </div>
                        </div>
                      )}
                      {request.dropoffLocation && (
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-red-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Drop-off</p>
                            <p className="text-gray-600">{request.dropoffLocation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Request Timeline</h3>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={item.status} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-1 ${
                        item.active ? 'bg-primary-red' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${item.active ? 'text-gray-900' : 'text-gray-500'}`}>
                            {item.status}
                          </p>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        {index < timeline.length - 1 && (
                          <div className={`w-px h-8 ml-2 mt-2 ${item.active ? 'bg-primary-red' : 'bg-gray-300'}`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Status</h3>
                <div className="text-center mb-6">
                  <span className={`${getPaymentStatusColor(request.paymentStatus)} text-lg px-4 py-2 rounded-full`}>
                    {request.paymentStatus || 'Pending'}
                  </span>
                </div>

                {request.paymentStatus !== 'Paid' && settings && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Payment Options</h4>
                      
                      {settings.mpesaPaybill && (
                        <div className="border rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="radio"
                              id="paybill"
                              name="payment"
                              value="paybill"
                              checked={paymentMethod === 'paybill'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-primary-red"
                            />
                            <label htmlFor="paybill" className="font-medium">M-Pesa Paybill</label>
                          </div>
                          <div className="ml-6 text-sm space-y-1">
                            <p><span className="font-medium">Paybill:</span> {settings.mpesaPaybill}</p>
                            <p><span className="font-medium">Account:</span> {request.id}</p>
                          </div>
                        </div>
                      )}

                      {settings.mpesaTill && (
                        <div className="border rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="radio"
                              id="till"
                              name="payment"
                              value="till"
                              checked={paymentMethod === 'till'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-primary-red"
                            />
                            <label htmlFor="till" className="font-medium">Lipa Na M-Pesa Till</label>
                          </div>
                          <div className="ml-6 text-sm space-y-1">
                            <p><span className="font-medium">Till:</span> {settings.mpesaTill}</p>
                            <p><span className="font-medium">Reference:</span> {request.id}</p>
                          </div>
                        </div>
                      )}

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Important:</strong> Use your Request ID as the Account/Reference number when making payment.
                        </p>
                      </div>

                      <button
                        onClick={handlePaymentConfirmation}
                        disabled={!paymentMethod}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        I Have Paid
                      </button>
                    </div>
                  </div>
                )}

                {showPaymentSuccess && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl p-6 text-center">
                      <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-600 mb-2">Payment Reported!</h3>
                      <p className="text-gray-600">We'll verify your payment and update the status shortly.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Support */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a 
                    href={`https://wa.me/254111679286?text=Hello, I need help with Request ID: ${request.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>WhatsApp Support</span>
                  </a>
                  <a 
                    href="tel:0111679286"
                    className="w-full bg-primary-red text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Call Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}