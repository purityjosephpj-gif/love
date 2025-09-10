'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const features = [
  'Professional and vetted service providers',
  '24/7 customer support available',
  'Transparent pricing with no hidden fees',
  'Real-time tracking and updates',
  'Money-back satisfaction guarantee',
  'Flexible scheduling to fit your needs',
  'Secure payment options',
  'Wide coverage area across the city'
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Why Choose <span className="text-primary-red">QuickLink?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're committed to providing exceptional service that exceeds your expectations.
              Here's what sets us apart from the competition.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-red rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700 text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Happy customer with delivered packages"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-6 -right-6 bg-primary-gold text-primary-black p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-sm font-medium">Happy Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}