import { NextResponse } from "next/server";

type Society = {
  id: string;
  name: string;
  address: string;
  membersCount: number;
  status: "Active" | "Inactive";
};

export async function GET() {
  const data: Society[] = [
    {
      id: "1",
      name: "Green Meadows",
      address: "123 Maple St, Springfield",
      membersCount: 150,
      status: "Active",
    },
    {
      id: "2",
      name: "Sunrise Villas",
      address: "456 Oak Avenue, Springfield",
      membersCount: 200,
      status: "Active",
    },
    {
      id: "3",
      name: "Blue Lagoon",
      address: "789 Pine Blvd, Lakeside",
      membersCount: 80,
      status: "Inactive",
    },
    {
      id: "4",
      name: "Silent Hills",
      address: "321 Elm Road, Hillside",
      membersCount: 120,
      status: "Active",
    },
  ];

  return NextResponse.json(data);
}
