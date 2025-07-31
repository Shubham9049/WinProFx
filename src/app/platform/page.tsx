import { div } from "framer-motion/client";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function MT5Page() {
  return (
    <div>
      <Navbar />
      <div className="bg-[#121E2C] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mt-4">
            MT5 Unleashed: Dive into <br />
            <span className="text-white">Limitless </span>
            <span className="text-[#00b3ff]">Trading Success </span>
            with <br /> WinproFX
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            WinproFX has achieved significant success in global business
            expansion. We offer the Best Forex Trading Platform on MT5,
            accessible on both Android and iPhone, bringing you one step closer
            to success. Take the plunge into a realm of endless trading
            opportunities by downloading MT5 now.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#00b3ff] text-white rounded-full hover:bg-[#0099dd] transition">
            Open Account
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#0e2330] to-[#143f53] rounded-xl max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="flex-1">
            <Image
              src="https://winprofx.com/_next/static/media/mobile.a656fac5.svg"
              alt="MT5 Mobile"
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-gray-400 uppercase mb-2">
              Trading Platform
            </p>
            <h2 className="text-xl font-semibold mb-2">
              Download MT 5 <br />
              <span className="text-[#00b3ff]">For Mobile</span>
            </h2>
            <p className="text-gray-300 mb-4">
              WinproFX has remained highly successful to expand their business
              all over the world, and now we are MT5 is now available on Android
              and iPhone, and you are one step closer to success. Download MT5
              now and dive into the world of limitless trading opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href="#"
                className="bg-[#1a1f2e] hover:bg-[#273047] px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <Image
                  src="https://winprofx.com/_next/static/media/PlayStore.c6f3d1de.png"
                  alt="Google Play"
                  width={20}
                  height={20}
                />
                <span>GET IT FOR Google Play</span>
              </a>
              <a
                href="#"
                className="bg-[#1a1f2e] hover:bg-[#273047] px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <Image
                  src="https://winprofx.com/_next/static/media/macOS.2bcddcf5.svg"
                  alt="App Store"
                  width={20}
                  height={20}
                />
                <span>GET IT FOR App Store</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0e2330] to-[#143f53] rounded-xl max-w-6xl mx-auto px-4 py-12 flex flex-col-reverse md:flex-row items-center gap-6 ">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-gray-400 uppercase mb-2">
              Trading Platform
            </p>
            <h2 className="text-xl font-semibold mb-2">
              Download MT 5 <br />{" "}
              <span className="text-[#00b3ff]">For Web</span>
            </h2>
            <p className="text-gray-300 mb-4">
              WinproFX has remained highly successful to expand their business
              all over the world, and now we are MT5 is now available on Android
              and iPhone, and you are one step closer to success. Download MT5
              now and dive into the world of limitless trading opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href="#"
                className="bg-[#1a1f2e] hover:bg-[#273047] px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <Image
                  src="https://winprofx.com/_next/static/media/laptop.db9ac6b2.svg"
                  alt="Windows"
                  width={20}
                  height={20}
                />
                <span>GET IT FOR Windows</span>
              </a>
              <div className="bg-[#1a1f2e] px-4 py-2 rounded flex items-center justify-center gap-2 opacity-60 cursor-not-allowed">
                <Image
                  src="https://winprofx.com/_next/static/media/Windows.3bec1291.svg"
                  alt="Mac"
                  width={20}
                  height={20}
                />
                <span>Coming Soon mac OS</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="https://winprofx.com/_next/static/media/laptop.db9ac6b2.svg"
              alt="MT5 Web"
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
