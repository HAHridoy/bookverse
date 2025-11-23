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

    const booksCollection = await dbConnect(collectionNameObj.bookCollection);
    const books = await booksCollection.find({}).toArray();

    return Response.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return Response.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
