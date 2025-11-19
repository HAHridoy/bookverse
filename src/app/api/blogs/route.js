// src/app/api/books/route.js
import { dbConnect, collectionNameObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const bookCollection = await dbConnect(collectionNameObj.blogCollection);
    const books = await bookCollection.find({}).toArray();
    return Response.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return Response.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
