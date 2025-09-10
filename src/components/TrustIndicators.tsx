'use client'
import { motion } from 'framer-motion'
import { Clock, DollarSign, Shield, Heart } from 'lucide-react'

const indicators = [
  {
    icon: Clock,
    title: 'Fast & Reliable',
    description: 'Quick response times'
  },
  {
    icon: DollarSign,
    title: 'Affordable',
    description: 'Competitive pricing'
  },
  {
    icon: Shield,
    title: 'Trusted',
    description: '100% secure service'
  },
  {
    icon: Heart,
    title: 'Personalized',
    description: 'Tailored to your needs'
  }
]

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <motion.div
              key={indicator.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-red rounded-full mb-4">
                <indicator.icon className="text-primary-gold" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">✔ {indicator.title}</h3>
              <p className="text-gray-600">{indicator.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}