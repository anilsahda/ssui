import { NextResponse } from "next/server";

export async function GET() {
  const complaints = [
    {
      id: "1",
      title: "Leaking pipe",
      description: "There is a leaking pipe in the kitchen.",
      user: "John Doe",
      status: "Pending",
      createdAt: "2023-09-01T10:00:00Z",
    },
    {
      id: "2",
      title: "Broken light",
      description: "Living room light is not working.",
      user: "Jane Smith",
      status: "Resolved",
      createdAt: "2023-08-25T14:30:00Z",
    },
    {
      id: "3",
      title: "No water supply",
      description: "Water supply has been down since morning.",
      user: "Mark Johnson",
      status: "Pending",
      createdAt: "2023-09-10T08:45:00Z",
    },
  ];

  return NextResponse.json(complaints);
}
