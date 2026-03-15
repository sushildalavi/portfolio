import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import FeaturedProjects from "@/components/FeaturedProjects"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Publications from "@/components/Publications"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
