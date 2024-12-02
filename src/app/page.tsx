import { HeroSection } from '../components/sections/HeroSection'
import { KeyFeatures } from '../components/sections/KeyFeatures'
import { PropertyHighlights } from '../components/sections/PropertyHighlights'
import { Gallery } from '../components/sections/Gallery'
import { Location } from '../components/sections/Location'
import { ContactSection } from '../components/sections/ContactSection'
import { FloatingContact } from '../components/ui/FloatingContact'
import { Header } from '../components/ui/Header'

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <div className="content-wrapper">
        <HeroSection />
        <KeyFeatures />
        <PropertyHighlights />
        <Gallery />
        <Location />
        <ContactSection />
      </div>
      <FloatingContact />
    </div>
  )
}
