import BenefitsSection from "../../components/BenefitsSection";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import evolving from "../../assets/icons/evolving.svg";
import awards from "../../assets/icons/awards.svg";
import country from "../../assets/icons/countries.svg";
import trading from "../../assets/icons/trading.svg";
import Stats from "../../components/Stats";

export default function Home() {
  return (
    <div className="bg-[#121E2C]">
      <Navbar />
      <Hero />
      <Stats />

      <BenefitsSection />
      <Footer />
    </div>
  );
}
