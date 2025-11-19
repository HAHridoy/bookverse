import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  bookCollection: "bookCollection",
  userCollection: "userCollection",
  blogCollection: "blogCollection",
  cartCollection: "cartCollection",
};
export async function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  if (!dbName) {
    throw new Error("DB_NAME environment variable is not set");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.db(dbName).collection(collectionName);
}
