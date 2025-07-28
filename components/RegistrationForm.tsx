"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function RegistrationForm() {
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    if (phone.length >= 10) alert("OTP Sent");
    else alert("Enter a valid phone number.");
  };

  return (
    <section className=" py-12 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">
        Start Your Journey Towards <br />
        <span className="text-cyan-400">Growth & Success</span>
      </h2>

      <div className="bg-white text-black w-11/12 md:w-2/3 lg:w-1/3 mx-auto mt-10 rounded-2xl p-6 md:p-10 space-y-6 shadow-xl">
        <div className="text-left">
          <h3 className="text-lg font-bold">Registration Form</h3>
          <p className="text-sm text-gray-500">
            Drop your details, we will get in touch with you soon.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="👤 First Name"
            className="border rounded-md px-4 py-2 flex-1 bg-gray-50 text-sm"
          />
          <input
            type="text"
            placeholder="👤 Last Name"
            className="border rounded-md px-4 py-2 flex-1 bg-gray-50 text-sm"
          />
        </div>

        <input
          type="email"
          placeholder="✉️ Email"
          className="border rounded-md px-4 py-2 w-full bg-gray-50 text-sm"
        />

        {/* ✅ Phone with Country Code */}
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="!w-full !py-2 !pl-10 !text-sm !bg-gray-50 !border !rounded-md"
              buttonClass="!bg-gray-200"
              dropdownClass="!bg-white"
              containerClass="!w-full"
              inputProps={{
                required: true,
                name: "phone",
              }}
            />
          </div>
          <button
            onClick={handleSendOtp}
            className={`bg-gray-400 text-white px-4 py-2 rounded-md text-sm ${
              phone.length >= 10
                ? "hover:bg-gray-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={phone.length < 10}
          >
            Send OTP
          </button>
        </div>

        <textarea
          placeholder="💬 Message"
          rows={3}
          className="w-full border rounded-md px-4 py-2 bg-gray-50 text-sm"
        ></textarea>

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            By submitting this form, you agree to be contacted by our team.
          </span>
        </label>

        <button
          disabled={!agreed}
          className={`w-full py-2 rounded-full font-semibold text-white ${
            agreed
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
