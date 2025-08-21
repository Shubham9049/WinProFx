"use client";

export default function CurrencyRates() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-white mb-4">Currency Rates</h1>
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://fxpricing.com/fx-widget/market-currency-rates-widget.php?id=1,2,3,5,6,7,8,9,10&click_target=blank&theme=dark&tm-cr=212529&hr-cr=FFFFFF13&by-cr=28A745&sl-cr=DC3545&flags=circle&value_alignment=center&column=price,ask,bid,chg,chg_per,spread,time&lang=en&font=Arial,%20sans-serif"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
