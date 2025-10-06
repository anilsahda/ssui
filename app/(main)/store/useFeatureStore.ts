// app/(main)/store/useFeatureStore.ts

import { create } from "zustand";
import { ReactNode } from "react";
import {
  FaBookReader,
  FaUsers,
  FaLaptopCode,
  FaCheckCircle,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

// Define the type for a single feature item
type Feature = {
  icon: ReactNode;
  color: string;
  title: string;
  desc: string;
};

// Define the shape of the Zustand store
type FeatureStore = {
  features: Feature[];
};

// Create the Zustand store
const useFeatureStore = create<FeatureStore>(() => ({
  features: [
    {
      icon: <FaBookReader size={28} />,
      color: "primary",
      title: "Centralized Resources",
      desc: "Access books, journals, and research materials — all in one intuitive platform.",
    },
    {
      icon: <FaUsers size={28} />,
      color: "success",
      title: "Student-Centric Design",
      desc: "Crafted for seamless use by students, educators, and administrators.",
    },
    {
      icon: <FaLaptopCode size={28} />,
      color: "warning",
      title: "Powered by Tech",
      desc: "Built on a modern tech stack for speed, scalability, and performance.",
    },
    {
      icon: <FaCheckCircle size={28} />,
      color: "info",
      title: "Smart Management",
      desc: "Advanced dashboards, analytics, and automated workflows.",
    },
    {
      icon: <FaRocket size={28} />,
      color: "danger",
      title: "Lightning Performance",
      desc: "Instant search, real-time tracking, and zero-lag interfaces.",
    },
    {
      icon: <FaShieldAlt size={28} />,
      color: "secondary",
      title: "Built-In Security",
      desc: "Role-based access and data protection baked into the system.",
    },
  ],
}));

export default useFeatureStore;
