import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect, collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session || session.user?.email !== "hosainoolalam123@gmail.com") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, we'll return mock orders since we need to set up an orders collection
    // In a real scenario, you'd fetch from an ordersCollection
    const mockOrders = [
      {
        id: "ORD-001",
        customerName: "John Doe",
        email: "john@example.com",
        amount: 89.99,
        status: "Completed",
        date: new Date("2025-02-15"),
        items: 3,
      },
      {
        id: "ORD-002",
        customerName: "Jane Smith",
        email: "jane@example.com",
        amount: 149.5,
        status: "Pending",
        date: new Date("2025-02-16"),
        items: 5,
      },
      {
        id: "ORD-003",
        customerName: "Bob Johnson",
        email: "bob@example.com",
        amount: 59.99,
        status: "Completed",
        date: new Date("2025-02-17"),
        items: 2,
      },
    ];

    return Response.json(mockOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
