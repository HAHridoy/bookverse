"use server";

import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = await dbConnect(collectionNameObj.userCollection);

  const user = await userCollection.findOne({ email });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;
  return user;
};
