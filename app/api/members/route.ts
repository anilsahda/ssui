import { NextResponse } from "next/server";

export async function GET() {
  const members = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "987-654-3210",
      status: "Inactive",
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@example.com",
      phone: "555-555-5555",
      status: "Active",
    },
  ];

  return NextResponse.json(members);
}
