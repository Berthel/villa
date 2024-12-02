import { HeroSection } from '@/components/sections/HeroSection'
import { KeyFeatures } from '@/components/sections/KeyFeatures'
import { PropertyHighlights } from '@/components/sections/PropertyHighlights'
import { Gallery } from '@/components/sections/Gallery'
import { Location } from '@/components/sections/Location'
import { ContactSection } from '@/components/sections/ContactSection'
import { FloatingContact } from '@/components/ui/FloatingContact'
import { Header } from '@/components/ui/Header'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header className="fixed top-0 left-0 right-0 z-50" />
      <HeroSection />
      <KeyFeatures />
      <PropertyHighlights />
      <Gallery />
      <Location />
      <ContactSection />
      <FloatingContact />
    </div>
  )
} 