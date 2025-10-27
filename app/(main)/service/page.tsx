"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaDatabase,
  FaPaintBrush,
  FaLaptopCode,
} from "react-icons/fa";

export default function Service() {
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const services = [
    {
      icon: <FaCode size={35} className="text-primary" />,
      title: "Web Development",
      desc: "Building modern, responsive, and scalable web applications with the latest technologies like React and .NET Core.",
      details:
        "Our web development services focus on crafting high-performance, SEO-friendly web applications that deliver great user experiences across devices.",
      delay: 100,
    },
    {
      icon: <FaMobileAlt size={35} className="text-success" />,
      title: "Mobile App Development",
      desc: "Creating high-performance mobile apps with a seamless user experience using .NET MAUI and React Native.",
      details:
        "We specialize in building cross-platform mobile applications that are lightweight, secure, and optimized for performance.",
      delay: 200,
    },
    {
      icon: <FaCloud size={35} className="text-info" />,
      title: "Cloud Integration",
      desc: "Deploying and scaling applications on AWS, Azure, or Docker containers for maximum reliability and performance.",
      details:
        "Our experts integrate cloud-based services to enhance scalability, reduce costs, and ensure high availability.",
      delay: 300,
    },
    {
      icon: <FaDatabase size={35} className="text-warning" />,
      title: "Database Design",
      desc: "Designing efficient database schemas and implementing secure, optimized data access using SQL Server and MongoDB.",
      details:
        "We architect scalable, optimized, and secure databases that can handle millions of transactions smoothly.",
      delay: 400,
    },
    {
      icon: <FaPaintBrush size={35} className="text-danger" />,
      title: "UI/UX Design",
      desc: "Crafting beautiful, user-friendly interfaces with a focus on clean design, usability, and accessibility.",
      details:
        "We blend creativity and functionality to deliver pixel-perfect UI designs with smooth user experiences.",
      delay: 500,
    },
    {
      icon: <FaLaptopCode size={35} className="text-secondary" />,
      title: "Full Stack Solutions",
      desc: "Delivering complete end-to-end solutions, from frontend to backend, integrating modern frameworks and APIs.",
      details:
        "From concept to deployment, we build robust and maintainable systems that align with your business goals.",
      delay: 600,
    },
  ];

  return (
    <div
      className="py-5 min-vh-100 position-relative"
      style={{
        background: "linear-gradient(135deg, #007bff, #6f42c1, #00c6ff)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 12s ease infinite",
        color: "#fff",
      }}
    >
      {/* Header Section */}
      <div className="container text-center mb-5">
        <div data-aos="fade-down">
          <h1 className="fw-bold mb-3 display-5">
            Our <span className="text-warning">Services</span>
          </h1>
          <p className="lead text-light">
            We provide top-tier full-stack development solutions powered by
            modern technologies and creative design.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="col-md-4"
              data-aos="flip-left"
              data-aos-delay={service.delay}
            >
              <div
                className="card shadow-lg border-0 h-100 p-4 text-center service-card position-relative"
                style={{
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  color: "#000",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div className="mb-3">{service.icon}</div>
                <h5 className="fw-bold mb-2">{service.title}</h5>
                <p className="text-muted small">{service.desc}</p>
                <button
                  className="btn btn-outline-primary btn-sm mt-3"
                  data-aos="fade-up"
                  onClick={() => setSelectedService(service)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal (Bootstrap) */}
      {selectedService && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setSelectedService(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">{selectedService.title}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedService(null)}
                ></button>
              </div>
              <div className="modal-body text-dark">
                <p>{selectedService.details}</p>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedService(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
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
        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        .btn-outline-primary:hover {
          color: #fff !important;
          background-color: #007bff !important;
          border-color: #007bff !important;
        }
      `}</style>
    </div>
  );
}
