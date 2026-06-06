"use client";

import React, { useState } from "react";

interface FormData {
  username: string;
  email: string;
  phone: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  phone?: string;
  submit?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    
    // Username validation
    const usernameTrimmed = formData.username.trim();
    if (!usernameTrimmed) {
      tempErrors.username = "Name/Username is required";
    } else if (usernameTrimmed.length < 2) {
      tempErrors.username = "Username must be at least 2 characters";
    } else if (usernameTrimmed.length > 30) {
      tempErrors.username = "Username must be at most 30 characters";
    }

    // Email validation
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(emailTrimmed)) {
      tempErrors.email = "Invalid email address";
    }

    // Phone validation
    const phoneTrimmed = formData.phone.trim();
    const phoneRegex = /^\+?[0-9\s\-]+$/;
    if (!phoneTrimmed) {
      tempErrors.phone = "Phone number is required";
    } else if (phoneTrimmed.length < 7) {
      tempErrors.phone = "Phone number too short (min 7 digits)";
    } else if (phoneTrimmed.length > 15) {
      tempErrors.phone = "Phone number too long (max 15 digits)";
    } else if (!phoneRegex.test(phoneTrimmed)) {
      tempErrors.phone = "Invalid phone number format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as they type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setSuccessMessage(data.message || "You're on the early access list! Check your email for confirmation.");
        setFormData({ username: "", email: "", phone: "" });
      } else {
        setStatus("error");
        setErrors({
          submit: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      setErrors({
        submit: "Unable to connect to the server. Please check your internet connection and try again.",
      });
    }
  };

  // Determine circle indicator color based on status
  const getIndicatorStyle = () => {
    switch (status) {
      case "success":
        return "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]";
      case "error":
        return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]";
      case "submitting":
        return "bg-amber-500 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.8)]";
      case "idle":
      default:
        return "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]";
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden text-white font-sans antialiased"
      style={{
        backgroundImage: "url('/assets/gradient-background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header navigation containing brand logo */}
      <header className="relative z-10 w-full pt-8 px-4 lg:pt-8 lg:pr-16 flex justify-end">
        <div className="text-[20px] lg:text-[24px] font-bold tracking-tight select-none">
          QuellDesk
        </div>
      </header>

      {/* Main Waitlist Content positioned at the bottom */}
      <main className="relative z-10 w-full pb-8 px-4 lg:pb-32 lg:px-16 flex flex-col mt-auto">
        {/* Back to Home Link */}
        <div className="mb-8 lg:mb-13">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[20px] lg:text-[24px] font-semibold hover:opacity-80 transition-opacity"
          >
            <span className="font-light">←</span> Back to Home
          </a>
        </div>

        {/* Title Line 1 */}
        <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[128px] font-normal tracking-tight leading-none select-none">
          Get Early Access,
        </h2>

        {/* Subheading row containing form/message and Title Line 2 */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-12 mt-4 lg:mt-16">
          
          {/* Registration Form / Success Message & Indicator */}
          <div className="order-2 lg:order-1 flex flex-col items-start lg:pl-32 w-full lg:max-w-112.5 min-h-[300px] justify-end">
            {status === "success" ? (
              <div className="w-full flex flex-col items-start animate-fade-in">
                <h3 className="text-[24px] lg:text-[28px] font-semibold mb-4 text-green-400">
                  Welcome to the Waitlist!
                </h3>
                <p className="text-[16px] lg:text-[20px] font-normal leading-[1.4] opacity-95">
                  {successMessage}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[14px] lg:text-[16px] font-semibold underline opacity-80 hover:opacity-100 transition-opacity"
                >
                  Register another account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6" noValidate>
                {/* Name / Username Field */}
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-[12px] uppercase tracking-wider text-white/50 mb-1.5 font-semibold">
                    Name / Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-[16px] lg:text-[20px] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/20 font-sans"
                  />
                  {errors.username && (
                    <span className="text-red-400 text-[13px] mt-1.5 font-medium">{errors.username}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[12px] uppercase tracking-wider text-white/50 mb-1.5 font-semibold">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-[16px] lg:text-[20px] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/20 font-sans"
                  />
                  {errors.email && (
                    <span className="text-red-400 text-[13px] mt-1.5 font-medium">{errors.email}</span>
                  )}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-[12px] uppercase tracking-wider text-white/50 mb-1.5 font-semibold">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number (e.g. +123456789)"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-[16px] lg:text-[20px] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/20 font-sans"
                  />
                  {errors.phone && (
                    <span className="text-red-400 text-[13px] mt-1.5 font-medium">{errors.phone}</span>
                  )}
                </div>

                {/* Form-level Error Message */}
                {errors.submit && (
                  <div className="text-red-400 text-[14px] font-semibold leading-snug mt-1">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all text-[16px] lg:text-[18px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      Join the Waitlist <span className="font-light">→</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Glowing Interactive Circle Status Indicator */}
            <div className={`w-4 h-4 rounded-full mt-6 lg:mt-8 transition-all duration-500 ${getIndicatorStyle()}`} />
          </div>

          {/* Title Line 2 */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[128px] font-normal tracking-tight leading-none lg:leading-[0.9] select-none text-left lg:text-right">
              Driven By Data
            </h2>
          </div>

        </div>
      </main>
    </div>
  );
}
