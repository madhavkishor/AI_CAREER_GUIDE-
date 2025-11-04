import { ResumeForm } from "../components/ResumeForm";
import {
  Briefcase,
  Target,
  Sparkles,
  TrendingUp,
  FileText,
  Users,
  Award,
  Rocket,
} from "lucide-react";
import { useEffect, useState } from "react";

const FloatingIcon = ({ Icon, delay, duration, path }) => {
  return (
    <div
      className="absolute opacity-20 text-indigo-400"
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        animationFillMode: "both",
      }}
    >
      <Icon size={32} strokeWidth={1.5} />
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translate(${path.x1}px, ${path.y1}px)
              rotate(${path.r1}deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(${path.x2}px, ${path.y2}px)
              rotate(${path.r2}deg);
            opacity: 0.2;
          }
          75% {
            transform: translate(${path.x3}px, ${path.y3}px)
              rotate(${path.r3}deg);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingIcons = [
    {
      Icon: Briefcase,
      delay: 0,
      duration: 20,
      position: { top: "10%", left: "5%" },
      path: {
        x1: 50,
        y1: 80,
        x2: -30,
        y2: 120,
        x3: 40,
        y3: 60,
        r1: 15,
        r2: -10,
        r3: 5,
      },
    },
    {
      Icon: Target,
      delay: 2,
      duration: 18,
      position: { top: "25%", right: "8%" },
      path: {
        x1: -60,
        y1: 70,
        x2: 40,
        y2: 100,
        x3: -50,
        y3: 50,
        r1: -20,
        r2: 15,
        r3: -8,
      },
    },
    {
      Icon: Sparkles,
      delay: 4,
      duration: 22,
      position: { top: "60%", left: "10%" },
      path: {
        x1: 70,
        y1: -60,
        x2: -40,
        y2: -90,
        x3: 60,
        y3: -40,
        r1: 25,
        r2: -15,
        r3: 10,
      },
    },
    {
      Icon: TrendingUp,
      delay: 1,
      duration: 19,
      position: { top: "70%", right: "12%" },
      path: {
        x1: -50,
        y1: -70,
        x2: 30,
        y2: -100,
        x3: -40,
        y3: -60,
        r1: -18,
        r2: 12,
        r3: -6,
      },
    },
    {
      Icon: FileText,
      delay: 3,
      duration: 21,
      position: { top: "15%", right: "25%" },
      path: {
        x1: 40,
        y1: 90,
        x2: -50,
        y2: 110,
        x3: 35,
        y3: 70,
        r1: 12,
        r2: -20,
        r3: 8,
      },
    },
    {
      Icon: Users,
      delay: 5,
      duration: 17,
      position: { top: "45%", left: "15%" },
      path: {
        x1: -65,
        y1: 60,
        x2: 45,
        y2: 85,
        x3: -55,
        y3: 45,
        r1: -22,
        r2: 18,
        r3: -10,
      },
    },
    {
      Icon: Award,
      delay: 2.5,
      duration: 20,
      position: { top: "80%", left: "20%" },
      path: {
        x1: 55,
        y1: -80,
        x2: -35,
        y2: -105,
        x3: 50,
        y3: -50,
        r1: 20,
        r2: -16,
        r3: 12,
      },
    },
    {
      Icon: Rocket,
      delay: 4.5,
      duration: 18.5,
      position: { top: "35%", right: "18%" },
      path: {
        x1: -45,
        y1: 75,
        x2: 55,
        y2: 95,
        x3: -40,
        y3: 55,
        r1: -15,
        r2: 20,
        r3: -8,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>

        {/* Floating Icons */}
        {mounted &&
          floatingIcons.map((icon, index) => (
            <div key={index} style={icon.position} className="absolute">
              <FloatingIcon {...icon} />
            </div>
          ))}
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative z-10">
        {/* Glowing Badge */}
        <div className="mb-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-indigo-300/30 backdrop-blur-md shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <p className="text-indigo-700 text-sm font-semibold tracking-wide">
              AI-Powered Job Matching
            </p>
          </div>
        </div>

        {/* Main Heading with Enhanced Gradient */}
        <h1 className="text-6xl md:text-8xl font-black text-center mb-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent leading-tight tracking-tight">
          Transform Your Resume
        </h1>

        <p className="text-2xl md:text-3xl text-gray-700 text-center mb-6 max-w-2xl font-light">
          Into Tailored Job Opportunities
        </p>

        <p className="text-gray-600 text-center mb-12 max-w-2xl leading-relaxed text-lg">
          Upload your resume and let our AI extract your skills to match you
          with real-time job listings.
          <span className="block mt-2 text-indigo-600 font-semibold">
            Intentional. Intelligent. Innovative.
          </span>
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl">
          <div className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm">
            <span className="text-sm text-gray-700 font-medium">
              ⚡ Instant Matching
            </span>
          </div>
          <div className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm">
            <span className="text-sm text-gray-700 font-medium">
              🎯 Smart Recommendations
            </span>
          </div>
          <div className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm">
            <span className="text-sm text-gray-700 font-medium">
              🚀 Career Growth
            </span>
          </div>
        </div>

        {/* Resume Form Component with Enhanced Container */}
        <div className="w-full max-w-2xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-indigo-100/50 p-8">
            <ResumeForm />
          </div>
        </div>


      </div>

      {/* Enhanced Footer */}
      <footer className="border-t border-indigo-100/50 backdrop-blur-xl bg-white/50 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-indigo-900 font-bold text-lg block">
                  AI Career Guide
                </span>
                <span className="text-gray-500 text-xs">
                  Your Path to Success
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-gray-600 text-sm text-center max-w-md">
              Blending tradition with technology. Every interaction,
              intentional.
            </p>

            {/* Links */}
            <div className="flex gap-8 text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-100/50 text-center">
            <p className="text-gray-500 text-xs">
              © 2025 AI Career Guide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
