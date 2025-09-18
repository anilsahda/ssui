"use client";

import React from "react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <div className="container py-5 text-center">
      <div className="p-5 bg-white rounded shadow-sm">
        <h1 className="text-primary fw-bold mb-3">
          Welcome to the About Page!
        </h1>
        <p className="text-secondary fs-5">
          This is a simple, clean, and friendly page to tell users about your
          application.
        </p>

        <div className="mt-4">
          <Link href="/" className="btn btn-outline-primary me-2">
            Go to Home
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
