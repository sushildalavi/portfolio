import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import TechMarquee from "@/components/TechMarquee"
import FeaturedProjects from "@/components/FeaturedProjects"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Publications from "@/components/Publications"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import ScrollToTop from "@/components/ScrollToTop"
import PageLoader from "@/components/PageLoader"

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
