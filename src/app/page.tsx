import BenefitsSection from "../../components/BenefitsSection";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <div className="bg-[#0D1721]">
      <Navbar />
      <Hero />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
