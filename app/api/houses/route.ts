import { NextResponse } from "next/server";

export async function GET() {
  const houses = [
    {
      id: "1",
      name: "Sunset Villa",
      location: "Downtown",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Palm Residency",
      location: "Riverside",
      isAvailable: false,
    },
    {
      id: "3",
      name: "Hilltop Haven",
      location: "Uptown",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Greenwood Estate",
      location: "Suburbia",
      isAvailable: true,
    },
  ];

  return NextResponse.json(houses);
}
