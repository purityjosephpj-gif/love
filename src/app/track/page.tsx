'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RequestDashboard from '@/components/RequestDashboard'
import { Search, Package } from 'lucide-react'

export default function TrackPage() {
  const [requestId, setRequestId] = useState('')
  const [foundRequest, setFoundRequest] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const id = searchParams?.get('id')
    if (id) {
      setRequestId(id)
      handleSearch(id)
    }
  }, [searchParams])

  const handleSearch = (id?: string) => {
    const searchId = id || requestId
    if (!searchId) return

    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      const requests = JSON.parse(localStorage.getItem('requests') || '[]')
      const request = requests.find((r: any) => r.id === searchId)
      
      if (request && request.status !== 'Completed') {
        setFoundRequest(request)
      } else if (request && request.status === 'Completed') {
        setError('This request has been completed and access has been disabled.')
      } else {
        setError('Request not found. Please check your Request ID.')
      }
      
      setIsLoading(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  if (foundRequest) {
    return <RequestDashboard request={foundRequest} onBack={() => setFoundRequest(null)} />
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gray-50 min-h-[80vh] flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-red rounded-full mb-6">
              <Package className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Track Your <span className="text-primary-red">Request</span>
            </h1>
            <p className="text-xl text-gray-600">
              Enter your Request ID to view real-time status and updates
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={requestId}
                    onChange={(e) => setRequestId(e.target.value)}
                    placeholder="Enter your Request ID (e.g., ER-2025-123456)"
                    className="w-full px-4 py-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-lg"
                    required
                  />
                  <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Your Request ID was provided when you submitted your service request
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !requestId}
                className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Track Request</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Request IDs are provided immediately after service booking</p>
                <p>• Lost your Request ID? Contact us with your phone number</p>
                <p>• Completed requests are no longer trackable for security</p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <a 
                  href="https://wa.me/254111679286" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  WhatsApp Support
                </a>
                <a 
                  href="tel:0111679286"
                  className="bg-primary-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                >
                  Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}