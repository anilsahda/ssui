"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section
        className="py-5 bg-primary text-light text-center"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">About SS App</h1>
          <p className="lead mt-3">
            Learn more about our mission, vision, and the services we provide.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5" data-aos="fade-up">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6" data-aos="fade-right">
              <div className="card shadow-sm h-100 border-0 rounded-3">
                <div className="card-body">
                  <h3 className="card-title fw-bold">Our Mission</h3>
                  <p className="card-text text-muted">
                    Our mission is to deliver top-quality solutions that empower
                    users and businesses to achieve their goals efficiently and
                    effectively.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <div className="card shadow-sm h-100 border-0 rounded-3">
                <div className="card-body">
                  <h3 className="card-title fw-bold">Our Vision</h3>
                  <p className="card-text text-muted">
                    Our vision is to create a seamless digital experience,
                    combining innovation, reliability, and user-centric design
                    to enhance everyday life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Row */}
          <div className="row mt-5 g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="text-center p-4 bg-white shadow-sm rounded-3">
                <h4 className="fw-bold">100+ Projects</h4>
                <p className="text-muted">
                  Successfully delivered projects for our clients worldwide.
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="text-center p-4 bg-white shadow-sm rounded-3">
                <h4 className="fw-bold">50+ Clients</h4>
                <p className="text-muted">
                  Trusted by clients across multiple industries.
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="text-center p-4 bg-white shadow-sm rounded-3">
                <h4 className="fw-bold">24/7 Support</h4>
                <p className="text-muted">
                  Our team is available around the clock to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
