'use client'
import { motion } from 'framer-motion'
import { Briefcase, Home, Percent } from 'lucide-react'

const offers = [
  {
    icon: Briefcase,
    title: 'Corporate Packages',
    description: 'Bulk service deals for businesses and organizations',
    features: ['Volume discounts', 'Priority scheduling', 'Dedicated account manager', 'Monthly billing'],
    badge: '💼'
  },
  {
    icon: Home,
    title: 'Household Plans',
    description: 'Regular service packages for families and homes',
    features: ['Weekly/monthly plans', 'Family discounts', 'Flexible scheduling', 'Same-day service'],
    badge: '🏠'
  }
]

export default function SpecialOffers() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-gold text-primary-black px-4 py-2 rounded-full mb-4">
            <Percent size={20} className="mr-2" />
            <span className="font-semibold">Special Offers</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Exclusive <span className="text-primary-red">Packages</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take advantage of our specially designed packages for businesses and households
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary-red"
            >
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">{offer.badge}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{offer.title}</h3>
                  <p className="text-gray-600">{offer.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {offer.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-primary-red rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full btn-primary">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}