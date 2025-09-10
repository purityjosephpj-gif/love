'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'
import Logo from './Logo'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary-red shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Logo size={40} />
              <div>
                <h1 className="text-white font-bold text-xl">QUICKLINK SERVICES</h1>
                <p className="text-primary-gold text-sm">Your Time, Our Priority</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary-gold transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-white hover:text-primary-gold transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-primary-gold transition-colors">
              Contact
            </Link>
            <Link href="/track" className="text-white hover:text-primary-gold transition-colors">
              Track Request
            </Link>
            <div className="flex items-center space-x-4">
              <a href="tel:0111679286" className="text-white hover:text-primary-gold">
                <Phone size={20} />
              </a>
              <a href="mailto:info@quicklinkservices.com" className="text-white hover:text-primary-gold">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-gold"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary-red border-t border-red-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:text-primary-gold"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-white hover:text-primary-gold"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-white hover:text-primary-gold"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/track"
              className="block px-3 py-2 text-white hover:text-primary-gold"
              onClick={() => setIsOpen(false)}
            >
              Track Request
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}