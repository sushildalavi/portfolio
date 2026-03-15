import Sidebar from "@/components/Sidebar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import TechMarquee from "@/components/TechMarquee"
import FeaturedProjects from "@/components/FeaturedProjects"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Publications from "@/components/Publications"
import BeyondTheCode from "@/components/BeyondTheCode"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import ScrollToTop from "@/components/ScrollToTop"
import PageLoader from "@/components/PageLoader"
import MeshBackground from "@/components/MeshBackground"

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollToTop />
      <MeshBackground />
      <Sidebar />
      <div className="relative z-10 lg:ml-[268px]">
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <FeaturedProjects />
          <Experience />
          <Skills />
          <Publications />
          <BeyondTheCode />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
