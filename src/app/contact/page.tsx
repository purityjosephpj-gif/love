import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Get In <span className="text-primary-red">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help! Reach out to us anytime for questions, support, or to book our services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red p-3 rounded-full">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <div className="space-y-1">
                      <a href="tel:0111679286" className="block text-gray-600 hover:text-primary-red transition-colors">
                        0111679286
                      </a>
                      <a href="tel:0717562660" className="block text-gray-600 hover:text-primary-red transition-colors">
                        0717562660
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red p-3 rounded-full">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                    <div className="space-y-2">
                      <a 
                        href="https://wa.me/254111679286" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-fit"
                      >
                        Chat: +254 111 679 286
                      </a>
                      <a 
                        href="https://wa.me/254717562660" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-fit"
                      >
                        Chat: +254 717 562 660
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red p-3 rounded-full">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <a 
                      href="mailto:info@quicklinkservices.com"
                      className="text-gray-600 hover:text-primary-red transition-colors"
                    >
                      info@quicklinkservices.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red p-3 rounded-full">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Service Area</h3>
                    <p className="text-gray-600">Serving: [Your Town/Region]</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red p-3 rounded-full">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Hours</h3>
                    <p className="text-gray-600">24/7 Service Available</p>
                    <p className="text-sm text-gray-500">Customer support: 6 AM - 10 PM daily</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary-gold rounded-xl">
                <h3 className="font-bold text-lg mb-2">Emergency Services</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Need urgent assistance? Call our emergency hotline for immediate response.
                </p>
                <a 
                  href="tel:0111679286" 
                  className="bg-primary-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-block font-semibold"
                >
                  Emergency: 0111679286
                </a>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}