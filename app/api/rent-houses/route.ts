// app/api/rent-houses/route.ts

import { NextResponse } from "next/server";

type RentHouse = {
  id: string;
  name: string;
  location: string;
  rentAmount: number;
  status: "Available" | "Occupied";
};

export async function GET() {
  const data: RentHouse[] = [
    {
      id: "1",
      name: "Green View Apartment",
      location: "Downtown",
      rentAmount: 12000,
      status: "Available",
    },
    {
      id: "2",
      name: "Lakeview Residency",
      location: "Lakeside",
      rentAmount: 15000,
      status: "Occupied",
    },
    {
      id: "3",
      name: "Hilltop Flat",
      location: "Uptown",
      rentAmount: 10000,
      status: "Available",
    },
  ];

  return NextResponse.json(data);
}
