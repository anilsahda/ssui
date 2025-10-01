"use client";

import React, { useEffect, useState } from "react";
import {
  FaSpinner,
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaLock,
  FaRobot,
  FaPaintBrush,
  FaTools,
  FaShoppingCart,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
}

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "development":
      return <FaCode size={28} className="text-primary" />;
    case "mobile":
      return <FaMobileAlt size={28} className="text-success" />;
    case "cloud":
      return <FaCloud size={28} className="text-info" />;
    case "security":
      return <FaLock size={28} className="text-danger" />;
    case "ai":
      return <FaRobot size={28} className="text-warning" />;
    case "devops":
      return <FaTools size={28} className="text-secondary" />;
    case "design":
      return <FaPaintBrush size={28} style={{ color: "#e83e8c" }} />;
    case "ecommerce":
      return <FaShoppingCart size={28} className="text-success" />;
    default:
      return <FaCode size={28} className="text-secondary" />;
  }
};

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchServices = () => {
      setTimeout(() => {
        const dummyData: Service[] = [
          {
            id: 1,
            title: "Web Development",
            description: "Custom-built websites and web applications.",
            category: "development",
          },
          {
            id: 2,
            title: "Mobile Apps",
            description: "Cross-platform mobile solutions for iOS and Android.",
            category: "mobile",
          },
          {
            id: 3,
            title: "Cloud Services",
            description: "Reliable cloud infrastructure & migrations.",
            category: "cloud",
          },
          {
            id: 4,
            title: "Cybersecurity",
            description: "Secure your systems and protect your data.",
            category: "security",
          },
          {
            id: 5,
            title: "AI & Machine Learning",
            description: "Predictive analytics and intelligent automation.",
            category: "ai",
          },
          {
            id: 6,
            title: "CI/CD & DevOps",
            description: "Automation, monitoring, and faster deployments.",
            category: "devops",
          },
          {
            id: 7,
            title: "UI/UX Design",
            description: "Beautiful, intuitive, and accessible interfaces.",
            category: "design",
          },
          {
            id: 8,
            title: "eCommerce Development",
            description: "Build scalable and secure online stores.",
            category: "ecommerce",
          },
        ];
        setServices(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchServices();
  }, []);

  return (
    <div
      className="py-5 px-3 min-vh-100"
      style={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <style>
        {`
          .service-card {
            transition: all 0.3s ease-in-out;
            border-radius: 1.2rem;
            background-color: #ffffff;
            padding: 2rem;
            height: 100%;
          }

          .service-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
          }

          .icon-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(0, 123, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem auto;
          }

          .spinner-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50vh;
          }
        `}
      </style>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 text-primary" data-aos="fade-down">
            🛠️ Our Services
          </h1>
          <p
            className="text-muted fs-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            From development to design and AI — we’ve got your business covered.
          </p>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="spinner-wrapper">
            <FaSpinner className="spinner-border text-primary" size={40} />
          </div>
        ) : (
          <div className="row g-4">
            {services.map((service, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card service-card border-0 shadow-sm text-center">
                  <div className="icon-circle">{getIcon(service.category)}</div>
                  <h5 className="fw-semibold mb-2">{service.title}</h5>
                  <p className="text-muted small">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
