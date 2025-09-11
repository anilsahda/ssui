// app/api/sell-houses/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: "1",
      name: "Elegant Villa",
      location: "Newtown",
      price: 7500000,
      status: "For Sale",
    },
    {
      id: "2",
      name: "City Heights",
      location: "Downtown",
      price: 5600000,
      status: "Sold",
    },
    {
      id: "3",
      name: "Rosewood Residency",
      location: "Suburb",
      price: 8200000,
      status: "For Sale",
    },
  ];

  return NextResponse.json(data);
}
