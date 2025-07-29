import Image from "next/image";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A25] text-white text-sm font-montserrat px-6 py-10 md:px-16 lg:px-24">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo and intro */}
        <div>
          <Image
            src="https://winprofx.com/_next/static/media/logo.30704b62.svg"
            alt="WINPROFX"
            width={120}
            height={40}
            className="mb-4"
          />

          <p className="text-gray-300">
            Engage in trading with WinproFX – a single platform offering
            multiple opportunities.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-bold text-white mb-2">Explore</h3>
          <ul className="text-gray-400 space-y-1">
            {[
              "Home",
              "Platform",
              "About Us",
              "Our IB",
              "Holiday Schedule",
              "Education",
              "News & Insights",
              "Join Our Team",
              "Contact Us",
              "Sitemap",
              "Trading View",
            ].map((item, idx) => (
              <li key={idx} className="hover:text-white cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Markets */}
        <div>
          <h3 className="font-bold text-white mb-2">Markets</h3>
          <ul className="text-gray-400 space-y-1">
            {["Forex", "Indices", "Crypto", "Metals", "Commodities", "Oil"].map(
              (item, idx) => (
                <li key={idx} className="hover:text-white cursor-pointer">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-white mb-2">Contact Info</h3>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" /> whatsapp
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" /> support@winprofx.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-cyan-400" /> +971 4 447 1894
            </li>
          </ul>
          <div className="flex gap-3 mt-4 text-gray-400">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map(
              (Icon, idx) => (
                <Icon key={idx} className="hover:text-white cursor-pointer" />
              )
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-bold text-white mb-2">Address</h3>
          <p className="text-gray-300 text-sm">
            <span className="block font-medium text-white mb-1">
              📌 Registered Address:
            </span>
            Ground Floor, The Sotheby Building, Rodney Bay, Gros-Islet, SAINT
            Lucia P.O Box 838, Castries, Saint Lucia.
          </p>
          <p className="text-sm mt-2 text-gray-300">
            <span className="block font-medium text-white">
              Registration Number:
            </span>{" "}
            2023-00197
          </p>
          <p className="text-sm mt-1 text-gray-300">
            <span className="block font-medium text-white">
              Professional License Number:
            </span>{" "}
            1423678
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-white mb-2">Risk Warning</h4>
          <p className="text-gray-400 text-sm">
            Please note that forex trading and trading in other leveraged
            products involves a significant level of risk and is not suitable
            for all investors. Trading in financial instruments may result in
            losses as well as profits and your losses can be greater than your
            initial invested capital. Before undertaking any such transactions,
            you should ensure that you fully understand the risks involved and
            seek independent advice if necessary.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Restricted Regions</h4>
          <p className="text-gray-400 text-sm">
            WinproFX Limited does not provide services for citizens/residents of
            the USA, Cuba, Iraq, Myanmar, North Korea, Sudan. The services of
            WinproFX Limited are not intended for distribution to, or use by,
            any person in any country or jurisdiction where such distribution or
            use would be contrary to local law or regulation.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-xs flex flex-col md:flex-row md:justify-between items-center gap-2">
        <p>© 2025 All Rights Reserved By WinproFx</p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Privacy Policy",
            "Terms & Conditions",
            "AML Policy",
            "Deposit & withdrawal Policy",
            "Restricted Countries",
            "Risk Disclosure",
            "Client Services Agreement",
          ].map((item, idx) => (
            <span key={idx} className="hover:text-white cursor-pointer">
              {item}
            </span>
          ))}
        </div>
        <div className="w-full flex justify-center mt-4">
          <a
            href="https://www.bigwigdigital.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary-color)] px-4 py-3 uppercase text-xs tracking-widest text-center transition-colors hover:text-black dark:hover:text-white"
          >
            Made & Marketed with ❤️ by Bigwig Digital
          </a>
        </div>
      </div>
    </footer>
  );
}
