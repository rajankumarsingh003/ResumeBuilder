


import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-32 bg-gradient-to-b from-green-50 via-white to-white border-t border-slate-200">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-5 gap-14 text-sm text-slate-600">
        
        {/* Brand */}
        <div className="md:col-span-2">
          <img src="/resumelogo2.svg" alt="logo" className="h-11 w-auto mb-4" />
          <p className="max-w-sm leading-relaxed">
            Build stunning, professional resumes faster with AI-powered tools
            designed for modern job seekers.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6 text-slate-500">
            {[
              { href: "#", icon: "dribbble" },
              { href: "#", icon: "linkedin" },
              { href: "#", icon: "twitter" },
              { href: "#", icon: "youtube" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="hover:text-green-600 transition"
              >
                <i className={`lucide lucide-${item.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
          <ul className="space-y-2">
            {["Home", "Pricing", "Support", "Affiliate"].map((item) => (
              <li key={item}>
                <a href="/" className="hover:text-green-600 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
          <ul className="space-y-2">
            {["Company", "Blogs", "Community", "About"].map((item) => (
              <li key={item}>
                <a href="/" className="hover:text-green-600 transition">
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a href="/" className="hover:text-green-600 transition">
                Careers
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Hiring
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms & Conditions"].map((item) => (
              <li key={item}>
                <a href="/" className="hover:text-green-600 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>
          © 2025 Resume Builder · All rights reserved
        </p>
        <p className="mt-2">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-medium text-slate-700">
            Rajan Kumar Singh
          </span>{" "}
          · Proudly Made in India 🇮🇳
        </p>
      </div>
    </footer>
  );
};

export default Footer;
