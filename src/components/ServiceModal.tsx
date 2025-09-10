'use client'
import { useState } from 'react'
import { X, MapPin, Calendar, Clock, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

interface ServiceModalProps {
  service: {
    id: string
    title: string
    description: string
    emoji: string
  }
  onClose: () => void
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    serviceType: service.id,
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    title: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    budget: '',
    promoCode: '',
    acceptTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [requestId, setRequestId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newRequestId = `ER-2025-${Math.floor(Math.random() * 900000) + 100000}`
      setRequestId(newRequestId)
      
      // Store in localStorage (in real app, this would be sent to backend)
      const requests = JSON.parse(localStorage.getItem('requests') || '[]')
      const newRequest = {
        ...formData,
        id: newRequestId,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        paymentStatus: 'Pending'
      }
      requests.push(newRequest)
      localStorage.setItem('requests', JSON.stringify(requests))
      
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Request Submitted!</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Request ID</p>
            <p className="text-2xl font-bold text-primary-red">{requestId}</p>
          </div>
          <p className="text-gray-600 mb-6">
            We'll contact you shortly to confirm your request. Save your Request ID to track progress.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.open(`/track?id=${requestId}`, '_blank')}
              className="btn-primary w-full"
            >
              Track My Request
            </button>
            <button
              onClick={onClose}
              className="btn-gold w-full"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{service.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="0700000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Pickup Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                required
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="Enter pickup address"
              />
            </div>

            {(service.id === 'taxi' || service.id === 'delivery') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  Drop-off Location *
                </label>
                <input
                  type="text"
                  name="dropoffLocation"
                  required
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  placeholder="Enter destination"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              placeholder="Brief title for your request"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              placeholder="Please provide detailed instructions for your service request..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-1" />
                Preferred Time
              </label>
              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Budget Limit (Optional)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="Enter maximum budget"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code (Optional)
              </label>
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                placeholder="Enter promo code"
              />
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 rounded border-gray-300 text-primary-red focus:ring-primary-red"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-600">
              I accept the <span className="text-primary-red font-medium">Terms and Conditions</span> and 
              agree to the service charges that will be communicated before service delivery.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}