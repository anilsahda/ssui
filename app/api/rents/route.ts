import { NextResponse } from "next/server";

type RentHouse = {
  id: string;
  name: string;
  tenant: string;
  rentAmount: number;
  dueDate: string; // ISO date string
  status: "Paid" | "Due" | "Overdue";
};

export async function GET() {
  const data: RentHouse[] = [
    {
      id: "1",
      name: "Sunset Villa",
      tenant: "Alice Johnson",
      rentAmount: 1200,
      dueDate: "2025-09-25T00:00:00Z",
      status: "Due",
    },
    {
      id: "2",
      name: "Palm Residency",
      tenant: "Bob Smith",
      rentAmount: 1500,
      dueDate: "2025-09-01T00:00:00Z",
      status: "Overdue",
    },
    {
      id: "3",
      name: "Hilltop Haven",
      tenant: "Carol Williams",
      rentAmount: 1000,
      dueDate: "2025-10-05T00:00:00Z",
      status: "Paid",
    },
    // more mock entries ...
  ];

  return NextResponse.json(data);
}
