import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import TrustIndicators from '@/components/TrustIndicators'
import WhyChooseUs from '@/components/WhyChooseUs'
import SpecialOffers from '@/components/SpecialOffers'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustIndicators />
      <ServicesGrid />
      <WhyChooseUs />
      <SpecialOffers />
      <Footer />
    </div>
  )
}