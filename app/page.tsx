import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import ScrollToTop from "@/components/ScrollToTop"
import PageLoader from "@/components/PageLoader"
import ShaderLines from "@/components/ShaderLines"
import AIAssistant from "@/components/AIAssistant"
import MainSequence from "@/components/MainSequence"

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollToTop />
      <ShaderLines />
      <Sidebar />
      <div className="relative z-10 lg:ml-[268px]">
        <MainSequence />
        <Footer />
      </div>
      <AIAssistant />
    </>
  )
}
