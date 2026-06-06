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
  terms?: string;
  submit?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
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

    // Terms validation
    if (!agreedToTerms) {
      tempErrors.terms = "You must agree to the Terms & Privacy";
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
        setAgreedToTerms(false);
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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 font-sans antialiased text-zinc-900">
      <div className="w-full max-w-[1040px] min-h-[660px] bg-white rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row p-3 lg:p-4 gap-4 lg:gap-8">
        
        {/* Left mesh gradient brand card (desktop only) */}
        <div
          className="relative hidden lg:flex lg:w-[48%] rounded-[20px] overflow-hidden flex-col justify-between p-12 text-white"
          style={{
            backgroundImage: "url('/assets/gradient-background.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Logo */}
          <div className="text-[22px] font-bold tracking-tight select-none">
            QuellDesk
          </div>

          {/* Heading */}
          <div className="my-auto">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3 block">
              You can easily
            </span>
            <h1 className="text-[40px] font-bold leading-tight tracking-tight max-w-[320px]">
              Speed up your work with our Web App
            </h1>
          </div>

          {/* Partners list matching user screenshot layout */}
          <div>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider mb-5">
              Our partners
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 opacity-50 text-xs font-semibold">
              <span className="flex items-center gap-1">Discord</span>
              <span className="flex items-center gap-1">Instagram</span>
              <span className="flex items-center gap-1">Spotify</span>
              <span className="flex items-center gap-1">YouTube</span>
              <span className="flex items-center gap-1">TikTok</span>
            </div>
          </div>
        </div>

        {/* Right waitlist form section */}
        <div className="flex-1 flex flex-col justify-center px-4 lg:px-12 py-8 relative">
          
          <div className="w-full max-w-[380px] mx-auto">
            {/* Back to Home Link */}
            <div className="mb-6">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-800 transition-colors uppercase tracking-wider"
              >
                <span>←</span> Back to Home
              </a>
            </div>

            {status === "success" ? (
              <div className="w-full flex flex-col items-start animate-fade-in py-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[24px] lg:text-[28px] font-bold text-zinc-950 mb-4 tracking-tight">
                  Welcome to the Waitlist!
                </h3>
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-zinc-600">
                  {successMessage}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                >
                  Register another account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col" noValidate>
                
                {/* Header */}
                <h2 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-zinc-900 mb-1.5">
                  Get Started Now
                </h2>
                <p className="text-[14px] text-zinc-400 mb-8 font-medium">
                  Please fill in your details to continue.
                </p>

                {/* Name Field */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="username" className="text-[13px] font-bold text-zinc-700 mb-1.5">
                    Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-zinc-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl px-4 py-3 bg-white text-zinc-900 placeholder:text-zinc-300 text-[14px] transition-all outline-none"
                  />
                  {errors.username && (
                    <span className="text-red-600 text-[12px] mt-1.5 font-medium">{errors.username}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="text-[13px] font-bold text-zinc-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="workmail@gmail.com"
                    className="w-full border border-zinc-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl px-4 py-3 bg-white text-zinc-900 placeholder:text-zinc-300 text-[14px] transition-all outline-none"
                  />
                  {errors.email && (
                    <span className="text-red-600 text-[12px] mt-1.5 font-medium">{errors.email}</span>
                  )}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col mb-5">
                  <label htmlFor="phone" className="text-[13px] font-bold text-zinc-700 mb-1.5">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+123456789"
                    className="w-full border border-zinc-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl px-4 py-3 bg-white text-zinc-900 placeholder:text-zinc-300 text-[14px] transition-all outline-none"
                  />
                  {errors.phone && (
                    <span className="text-red-600 text-[12px] mt-1.5 font-medium">{errors.phone}</span>
                  )}
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex flex-col mb-6">
                  <div className="flex items-start gap-2.5">
                    <input
                      id="agreedToTerms"
                      name="agreedToTerms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        if (errors.terms) {
                          setErrors((prev) => ({ ...prev, terms: undefined }));
                        }
                      }}
                      className="h-4.5 w-4.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 mt-0.5 cursor-pointer accent-indigo-600"
                    />
                    <label htmlFor="agreedToTerms" className="text-[13px] text-zinc-500 select-none cursor-pointer leading-tight">
                      I agree to the{" "}
                      <a href="/terms" className="text-zinc-800 hover:text-zinc-950 font-semibold underline transition-colors">
                        Terms
                      </a>{" "}
                      &{" "}
                      <a href="/privacy" className="text-zinc-800 hover:text-zinc-950 font-semibold underline transition-colors">
                        Privacy
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <span className="text-red-600 text-[12px] mt-1.5 font-medium">{errors.terms}</span>
                  )}
                </div>

                {/* Form-level Error Message */}
                {errors.submit && (
                  <div className="text-red-600 text-[13px] font-semibold leading-snug mb-4">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                    </>
                  )}
                </button>

                {/* Alternative Log In options matching user screenshot */}
                <div className="relative my-6 text-center">
                  <hr className="border-zinc-100" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[11px] text-zinc-300 font-bold uppercase tracking-wider select-none">
                    Or
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Social login is disabled for waitlist.")}
                    className="flex-1 flex items-center justify-center gap-2 border border-zinc-200 hover:bg-zinc-50 rounded-xl py-3 text-[13px] font-semibold text-zinc-600 transition-all cursor-pointer"
                  >
                    {/* Google Icon SVG */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.66 0 3.16.57 4.34 1.7l3.24-3.24C17.61 1.68 14.97 1 12 1 7.24 1 3.2 3.73 1.25 7.72l3.86 3C6.03 7.82 8.79 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.45c-.28 1.48-1.11 2.73-2.37 3.58l3.69 2.87c2.16-1.99 3.42-4.93 3.42-8.55z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.11 10.72c-.25-.76-.4-1.57-.4-2.42 0-.85.15-1.66.4-2.42l-3.86-3C.45 4.63 0 6.27 0 8.3c0 2.03.45 3.67 1.25 5.42l3.86-3z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.87c-1.02.68-2.33 1.09-3.96 1.09-3.21 0-5.97-2.78-6.89-5.68l-3.86 3C3.2 20.27 7.24 23 12 23z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Social login is disabled for waitlist.")}
                    className="flex-1 flex items-center justify-center gap-2 border border-zinc-200 hover:bg-zinc-50 rounded-xl py-3 text-[13px] font-semibold text-zinc-600 transition-all cursor-pointer"
                  >
                    {/* Apple Icon SVG */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
