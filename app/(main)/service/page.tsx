"use client";

import React, { useEffect, useState } from "react";
import {
  FaSpinner,
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaLock,
} from "react-icons/fa";

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
}

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "development":
      return <FaCode size={36} className="text-primary" />;
    case "mobile":
      return <FaMobileAlt size={36} className="text-success" />;
    case "cloud":
      return <FaCloud size={36} className="text-info" />;
    case "security":
      return <FaLock size={36} className="text-danger" />;
    default:
      return <FaCode size={36} />;
  }
};

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">🛠️ Our Services</h1>
        <p className="text-muted fs-5">
          We provide top-notch technology solutions for businesses of all sizes.
        </p>
      </div>

      {loading ? (
        <div className="text-center">
          <FaSpinner className="spinner-border text-primary" />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-6 col-lg-3" key={service.id}>
              <div className="card h-100 text-center shadow-sm border-0 p-4 service-card">
                <div className="mb-3">{getIcon(service.category)}</div>
                <h5 className="fw-semibold">{service.title}</h5>
                <p className="text-muted small">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
