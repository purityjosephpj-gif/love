'use client'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-grid')
    servicesSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const openBookingModal = () => {
    // This would open a service selection modal
    document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-red via-red-700 to-primary-red min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFD700" className="text-primary-gold" />
                ))}
              </div>
              <span className="text-primary-gold font-medium">Trusted by 1000+ customers</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              ✨ QUICKLINK
              <br />
              <span className="text-primary-gold">SERVICES</span> ✨
            </h1>
            
            <p className="text-2xl lg:text-3xl font-light mb-8 text-primary-gold">
              "Your Time, Our Priority"
            </p>
            
            <p className="text-xl mb-10 leading-relaxed">
              Fast, reliable, and affordable service solutions for all your daily needs. 
              From taxi rides to grocery delivery, we handle it all so you can focus on what matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openBookingModal}
                className="btn-primary flex items-center justify-center space-x-2 text-lg py-4 px-8 animate-pulse-gold"
              >
                <span>Book a Service</span>
                <ArrowRight size={20} />
              </button>
              
              <button
                onClick={scrollToServices}
                className="btn-gold flex items-center justify-center space-x-2 text-lg py-4 px-8"
              >
                <span>View Services</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional service delivery"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-gold text-primary-black p-4 rounded-xl shadow-lg">
                <p className="font-bold text-lg">24/7 Service</p>
                <p className="text-sm">Always here for you</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}