"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRocket, FaUsers, FaCode, FaCogs, FaArrowUp } from "react-icons/fa";

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // Scroll to top smooth
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #007bff, #6f42c1, #00c6ff)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 12s ease infinite",
        color: "#fff",
      }}
    >
      {/* Floating Decorative Elements */}
      <div className="floating-bg position-absolute w-100 h-100 top-0 start-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div data-aos="fade-down">
          <h1 className="display-4 fw-bold mb-3 gradient-text">
            Welcome to the <span className="text-warning">Public Site</span>
          </h1>
          <p className="lead mb-4 text-light">
            Discover a modern, powerful, and responsive platform built for
            performance and style.
          </p>
        </div>

        {/* Buttons */}
        <div
          data-aos="zoom-in"
          className="d-flex justify-content-center gap-3 mt-3"
        >
          <button className="btn btn-light btn-lg rounded-pill px-4 fw-semibold shadow-sm pulse-btn">
            Get Started 🚀
          </button>
          <button className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold shadow-sm">
            Learn More
          </button>
        </div>
      </div>

      {/* Feature Section */}
      <div
        className="container py-5 mt-4 position-relative"
        style={{ zIndex: 2 }}
      >
        <div className="row g-4 justify-content-center">
          {[
            {
              icon: <FaRocket size={40} className="text-primary" />,
              title: "Fast Performance",
              desc: "Optimized for speed with cutting-edge web technologies.",
              delay: 100,
            },
            {
              icon: <FaUsers size={40} className="text-success" />,
              title: "User Friendly",
              desc: "An intuitive UI that users love to interact with.",
              delay: 200,
            },
            {
              icon: <FaCode size={40} className="text-warning" />,
              title: "Modern Tech Stack",
              desc: "Powered by Next.js, Bootstrap 5, and AOS animations.",
              delay: 300,
            },
            {
              icon: <FaCogs size={40} className="text-info" />,
              title: "Fully Customizable",
              desc: "Easily scalable and adaptable for your project’s needs.",
              delay: 400,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="col-md-3 col-sm-6"
              data-aos="fade-up"
              data-aos-delay={item.delay}
            >
              <div
                className="card border-0 shadow-lg h-100 text-center p-4 feature-card"
                style={{
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="mb-3">{item.icon}</div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-to-top Button */}
      <button
        onClick={scrollToTop}
        className="btn btn-light rounded-circle shadow position-fixed bottom-0 end-0 m-4 scroll-btn"
        title="Back to Top"
      >
        <FaArrowUp />
      </button>

      {/* Footer */}
      <footer
        className="mt-auto py-3 text-center text-light small"
        data-aos="fade-up"
      >
        © {new Date().getFullYear()} SS App — Crafted with 💙 using Next.js &
        Bootstrap.
      </footer>

      {/* Custom Animations & Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-text {
          background: linear-gradient(90deg, #fff, #ffc107, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }

        .pulse-btn {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        .scroll-btn {
          transition: transform 0.3s ease;
        }
        .scroll-btn:hover {
          transform: translateY(-3px) scale(1.1);
        }

        /* Floating bubbles animation */
        .bubble {
          position: absolute;
          bottom: -50px;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          animation: floatUp 10s infinite ease-in-out;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) scale(0.8);
            opacity: 0;
          }
        }
        .bubble:nth-child(1) {
          left: 10%;
          width: 15px;
          height: 15px;
          animation-delay: 0s;
        }
        .bubble:nth-child(2) {
          left: 25%;
          animation-delay: 2s;
        }
        .bubble:nth-child(3) {
          left: 40%;
          width: 25px;
          height: 25px;
          animation-delay: 4s;
        }
        .bubble:nth-child(4) {
          left: 55%;
          width: 10px;
          height: 10px;
          animation-delay: 1s;
        }
        .bubble:nth-child(5) {
          left: 70%;
          animation-delay: 3s;
        }
        .bubble:nth-child(6) {
          left: 85%;
          width: 18px;
          height: 18px;
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
}
