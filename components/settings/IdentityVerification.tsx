"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import docImage from "../../assets/icons/doc_upload-tuKFdIoz.png";
import ProfileImage from "./ProfileImage";

const steps = [
  "Instructions",
  "Proof Of Identity",
  "Proof Of Address",
  "Selfie Proof",
];

export default function IdentityVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formFiles, setFormFiles] = useState<{
    frontId?: File;
    backId?: File;
    addressProof?: File;
    selfie?: File;
  }>({});

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(formFiles).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });
    try {
      await axios.post("/api/identity-verification", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Documents submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Try again.");
    }
  };

  return (
    <div className="space-y-4">
      <ProfileImage />
      {/* Step Timeline */}
      <div className="w-full flex flex-col items-center">
        {/* Step Circles and Lines */}
        <div className="flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center relative"
            >
              {/* Line (connects left side except for first item) */}
              {index !== 0 && (
                <div
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 ${
                    currentStep > index ? "bg-[var(--primary)]" : "bg-gray-600"
                  }`}
                />
              )}

              {/* Line (connects right side except for last item) */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 ${
                    currentStep > index + 1
                      ? "bg-[var(--primary)]"
                      : "bg-gray-600"
                  }`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full z-10 flex items-center justify-center text-sm font-semibold ${
                  currentStep === index + 1
                    ? "bg-[var(--primary)] text-white"
                    : currentStep > index + 1
                    ? "bg-[var(--primary)] text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircle size={16} />
                ) : (
                  index + 1
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between w-full mt-2 text-xs text-white">
          {steps.map((step, i) => (
            <div key={i} className="w-1/4 text-center">
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      {currentStep === 1 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              INSTRUCTIONS TO UPLOAD DOCUMENTS
            </h2>
            <p className="text-sm text-gray-400">
              Your document security is our top priority.
              <br />
              Rest assured, all files uploaded through this portal are securely
              stored.
            </p>
            {[
              "Accepted File Formats: PDF, JPG, JPEG, PNG",
              "File Size Limitation: 5 MB per file",
              "Document Clarity: The document must be clear and readable.",
              "Valid Identity Card",
              "Selfie Clarity: Selfie with Document",
            ].map((text, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
            <button
              onClick={() => setCurrentStep(2)}
              className="mt-6 bg-[var(--primary)] hover:bg-[green-700] text-white font-semibold px-6 py-2 rounded-md"
            >
              Next
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <Image src={docImage} alt="doc" className="w-60 h-auto" />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            UPLOAD YOUR PROOF OF IDENTITY
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            BOTH FILES ARE MANDATORY. Upload front and back of your ID card.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">
                Front Side
              </label>
              <div className="mt-1 p-2 border border-gray-600 rounded-md overflow-hidden bg-transparent flex items-center">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, "frontId")}
                  className="file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium 
                 text-sm text-white w-full cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Upload the front side of your ID.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Back Side</label>
              <div className="mt-1 p-2 border border-gray-600 rounded-md overflow-hidden bg-transparent flex items-center">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, "backId")}
                  className="file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium 
                 text-sm text-white w-full cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Upload the back side of your ID.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-gray-600 px-6 py-2 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!formFiles.frontId || !formFiles.backId}
              className={`px-6 py-2 rounded-md text-white ${
                formFiles.frontId && formFiles.backId
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg">
          <div>
            <label className="text-sm font-medium">ADDRESS PROOF</label>
            <div className="mt-1 p-2 border border-gray-600 rounded-md overflow-hidden bg-transparent flex items-center">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFileChange(e, "addressProof")}
                className="file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium 
                 text-sm text-white w-full cursor-pointer"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Upload your proof of address
            </p>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-gray-600 px-6 py-2 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              disabled={!formFiles.addressProof}
              className={`px-6 py-2 rounded-md text-white ${
                formFiles.addressProof
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg">
          <div>
            <label className="text-sm font-medium">SELFIE PROOF</label>
            <div className="mt-1 p-2 border border-gray-600 rounded-md overflow-hidden bg-transparent flex items-center">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFileChange(e, "selfieProof")}
                className="file:bg-white file:text-black file:px-3 file:py-1 file:rounded file:border-0 file:font-medium 
                 text-sm text-white w-full cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-gray-600 px-6 py-2 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formFiles.selfie}
              className={`px-6 py-2 rounded-md text-white ${
                formFiles.selfie
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
