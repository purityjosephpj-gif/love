'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, ShoppingCart, Shirt, Package, CreditCard, Pill, BookOpen, Plane, Heart } from 'lucide-react'
import ServiceModal from './ServiceModal'

const services = [
  {
    id: 'taxi',
    title: 'Taxi Rides',
    icon: Car,
    description: 'Comfortable and safe transportation anywhere in the city',
    emoji: '🚖'
  },
  {
    id: 'grocery',
    title: 'Grocery Shopping & Delivery',
    icon: ShoppingCart,
    description: 'Fresh groceries delivered to your doorstep',
    emoji: '🛒'
  },
  {
    id: 'laundry',
    title: 'Laundry & Dry-Cleaning',
    icon: Shirt,
    description: 'Professional cleaning and pressing services',
    emoji: '👕'
  },
  {
    id: 'delivery',
    title: 'Gift & Parcel Delivery',
    icon: Package,
    description: 'Fast and secure delivery of your packages',
    emoji: '📦'
  },
  {
    id: 'bills',
    title: 'Utility & Bill Payments',
    icon: CreditCard,
    description: 'Pay your bills without leaving home',
    emoji: '💳'
  },
  {
    id: 'prescriptions',
    title: 'Prescription Runs',
    icon: Pill,
    description: 'Collect medicines from pharmacies',
    emoji: '💊'
  },
  {
    id: 'errands',
    title: 'School & Office Errands',
    icon: BookOpen,
    description: 'Document submission and office tasks',
    emoji: '📚'
  },
  {
    id: 'airport',
    title: 'Airport Pickups & Drop-offs',
    icon: Plane,
    description: 'Reliable airport transportation service',
    emoji: '✈️'
  },
  {
    id: 'support',
    title: 'Senior Support & Pet Care',
    icon: Heart,
    description: 'Compassionate care for elderly and pets',
    emoji: '❤️'
  }
]

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<any>(null)

  return (
    <>
      <section id="services-grid" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Our <span className="text-primary-red">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of professional services designed to make your life easier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{service.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-end">
                  <button className="text-primary-red font-semibold hover:text-red-700 transition-colors">
                    Book Now →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  )
}