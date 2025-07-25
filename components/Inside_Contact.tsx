export default function InsightsSection() {
  return (
    <section className="bg-[#072029] text-white py-16 px-4 text-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4">
        Critical Insights: Unveiling the{" "}
        <span className="text-[#00CFFF]">Pinnacle Learnings</span> for
        <br className="hidden md:block" /> Strategic Success.
      </h2>

      {/* Paragraph */}
      <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-8">
        Beginners and experienced forex traders alike must keep in mind that
        practice, knowledge, and discipline are key to getting and staying
        ahead. The Best Forex Brokers Platform can help achieve success.
      </p>

      {/* WhatsApp Button  */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-2.5 rounded-full text-base font-medium shadow-md border border-[#1DA851] transition"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-5 h-5"
        />
        WhatsApp
      </a>
    </section>
  );
}
