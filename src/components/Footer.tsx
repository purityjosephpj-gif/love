import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-primary-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo size={48} />
              <div>
                <h3 className="text-2xl font-bold">QUICKLINK SERVICES</h3>
                <p className="text-primary-gold">Your Time, Our Priority</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional service solutions for all your daily needs. 
              Fast, reliable, and affordable - that's our promise to you.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/254111679286" target="_blank" rel="noopener noreferrer" 
                 className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition-colors">
                <Phone size={20} />
              </a>
              <a href="mailto:info@quicklinkservices.com"
                 className="bg-primary-red p-3 rounded-full hover:bg-red-700 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-primary-gold transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-primary-gold transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary-gold transition-colors">Contact</Link></li>
              <li><Link href="/track" className="text-gray-300 hover:text-primary-gold transition-colors">Track Request</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-primary-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={16} className="text-primary-gold mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:0111679286" className="text-gray-300 hover:text-white block">0111679286</a>
                  <a href="tel:0717562660" className="text-gray-300 hover:text-white block">0717562660</a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-primary-gold mt-1 flex-shrink-0" />
                <a href="mailto:info@quicklinkservices.com" className="text-gray-300 hover:text-white">
                  info@quicklinkservices.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300">Serving: [Your Town/Region]</span>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={16} className="text-primary-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300">24/7 Service Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 QuickLink Services. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield size={16} className="text-primary-gold" />
              <span>Secure & Trusted</span>
            </div>
            
            <Link 
              href="/admin" 
              className="bg-primary-gold text-primary-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-primary-red text-center py-4">
        <p className="text-white font-medium">
          "Let Us Run the Errands, While You Run the World!"
        </p>
      </div>
    </footer>
  )
}