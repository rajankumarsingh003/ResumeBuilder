





import React, { useState } from "react";
import { Zap, ShieldCheck, Download, Cpu } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const [isHover, setIsHover] = useState(false);

  const features = [
    {
      title: "AI Resume Builder",
      description: "Create ATS-friendly resumes with smart suggestions.",
      icon: <Cpu className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Secure Data",
      description: "Your resume data is fully encrypted and safe.",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Easy Export",
      description: "Download PDF resumes instantly.",
      icon: <Download className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-orange-400 to-orange-500",
    },
  ];

  return (
    <div id="features" className="flex flex-col items-center my-20 scroll-mt-10 px-4 md:px-10">

      {/* Badge */}
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/20 rounded-full px-6 py-1.5 mb-4">
        <Zap width={14} />
        <span>Simple Process</span>
      </div>

      <Title
        title="Build your Resume"
        description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools."
      />

      <div className="flex flex-col md:flex-row items-center xl:-mt-10 gap-12">

        {/* Feature Image */}
        <img
          className="max-w-2xl w-full xl:-ml-32 rounded-2xl shadow-xl"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="features"
        />

        {/* Feature Cards */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.bg}`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
                <p className="text-white/90 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;
