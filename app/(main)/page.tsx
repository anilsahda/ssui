"use client";

import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="bg-white rounded shadow text-center p-5">
        <h1 className="display-4 text-primary fw-bold mb-3">
          Welcome to Dhakad Infotech!
        </h1>
        <p className="lead text-muted mb-4">
          Empowering digital transformation through innovative technology
          solutions.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link href="/about" className="btn btn-outline-primary btn-lg">
            Learn More
          </Link>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
