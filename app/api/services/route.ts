// app/api/services/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Creating responsive and modern websites tailored to your needs.",
      category: "Development",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description:
        "Cross-platform mobile apps for Android & iOS with sleek UX.",
      category: "Mobile",
    },
    {
      id: 3,
      title: "Cloud Services",
      description: "Deploy scalable and secure cloud infrastructure solutions.",
      category: "Cloud",
    },
    {
      id: 4,
      title: "Cybersecurity",
      description:
        "Protect your digital assets with industry-grade security services.",
      category: "Security",
    },
  ];

  return NextResponse.json(services);
}
