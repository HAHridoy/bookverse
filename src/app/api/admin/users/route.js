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

    const usersCollection = await dbConnect(collectionNameObj.userCollection);
    const users = await usersCollection.find({}).toArray();

    // Map and format users
    const formattedUsers = users.map((user) => ({
      _id: user._id.toString(),
      email: user.email,
      name: user.name || "Unknown",
      createdAt: user.createdAt || new Date(),
    }));

    return Response.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
