"use client";

import React, { useState } from "react";
import { toast } from "sonner";

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

  const showCustomToast = (
    type: "success" | "error" | "info" | "warning",
    title: string,
    message: string
  ) => {
    toast.custom(
      (t) => {
        let icon;

        if (type === "success") {
          icon = (
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          );
        } else if (type === "error") {
          icon = (
            <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          );
        } else if (type === "warning") {
          icon = (
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          );
        } else {
          icon = (
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 select-none text-[11px] font-extrabold font-serif">
              i
            </div>
          );
        }

        return (
          <div className="bg-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.07)] border border-zinc-100 flex overflow-hidden w-[360px] text-zinc-900 pointer-events-auto">
            {/* Left section */}
            <div className="flex-1 p-4 flex gap-3 items-start select-none">
              <div className="mt-0.5">{icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[14px] text-zinc-900 leading-tight">
                  {title}
                </h4>
                <p className="text-[12px] text-zinc-500 leading-normal mt-1 break-words">
                  {message}
                </p>
              </div>
            </div>
            {/* Right actions section */}
            <div className="w-[75px] border-l border-zinc-100 flex flex-col flex-shrink-0 select-none">
              <button
                type="button"
                onClick={() => toast.dismiss(t)}
                className="flex-1 text-[12px] font-bold text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 py-4.5 transition-colors cursor-pointer outline-none focus:bg-zinc-50 flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </div>
        );
      },
      { duration: 5000 }
    );
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
        showCustomToast("success", "Success", data.message || "You're on the early access list!");
        setFormData({ username: "", email: "", phone: "" });
        setAgreedToTerms(false);
      } else {
        setStatus("error");
        setErrors({
          submit: data.message || "Registration failed. Please try again.",
        });
        
        if (response.status === 409 || data.message === "Email already registered") {
          showCustomToast("info", "Already Registered", "This email address is already on our early access waitlist.");
        } else {
          showCustomToast("error", "Error", data.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      setErrors({
        submit: "Unable to connect to the server. Please check your internet connection and try again.",
      });
      showCustomToast("error", "Error", "Unable to connect to the server. Please check your internet connection.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased text-zinc-900">
      
      {/* Left mesh gradient brand section (desktop only) */}
      <div
        className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-16 text-white"
        style={{
          backgroundImage: "url('/assets/gradient-background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Logo */}
        <div className="text-[24px] font-bold tracking-tight select-none">
          QuellDesk
        </div>

        {/* Heading */}
        <div className="my-auto">
          <span className="text-white/60 text-[15px] font-semibold uppercase tracking-widest mb-4 block">
            You can easily
          </span>
          <h1 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[128px] font-normal tracking-tight leading-none text-left select-none">
            Speed up your work with our Web App
          </h1>
        </div>

        {/* Empty footer to align with main structure */}
        <div />
      </div>

      {/* Right waitlist form section (spans full viewport on mobile) */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-20 py-12 relative bg-white">
        
        <div className="w-full max-w-[380px] mx-auto">
          {/* Back to Home Link */}
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-zinc-400 hover:text-zinc-800 transition-colors uppercase tracking-wider"
            >
              <span>←</span> Back to Home
            </a>
          </div>

          {status === "success" ? (
            <div className="w-full flex flex-col items-start animate-fade-in py-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
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
              <h2 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-zinc-900 mb-2">
                Get Started Now
              </h2>
              <p className="text-[14px] text-zinc-400 mb-8 font-medium">
                Please fill in your details to continue.
              </p>

              {/* Name Field */}
              <div className="flex flex-col mb-4.5">
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
              <div className="flex flex-col mb-4.5">
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


              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-zinc-950 hover:bg-zinc-900 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
