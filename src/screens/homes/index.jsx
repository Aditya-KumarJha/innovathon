import NavBar from "../../components/Navbar"
import HeroSection from "../../components/herosection"
import ParticlesBackground from "../../components/particles"
import RootLayout from "../Layout"

export default function Homes() {
  return (
    <RootLayout>
      <main className="min-h-screen bg-[#0d1117] text-white overflow-hidden">
        <ParticlesBackground />
        <NavBar />
        <HeroSection />
      </main>
    </RootLayout>
  )
}