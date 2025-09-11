// app/api/search-items/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: "1",
      title: "Green Villa",
      description: "Spacious 3BHK near the city park.",
      location: "Downtown",
    },
    {
      id: "2",
      title: "Sunset Apartments",
      description: "1BHK with river view.",
      location: "Riverside",
    },
    {
      id: "3",
      title: "Uptown Heights",
      description: "Luxury apartment with amenities.",
      location: "Uptown",
    },
  ];

  return NextResponse.json(data);
}
