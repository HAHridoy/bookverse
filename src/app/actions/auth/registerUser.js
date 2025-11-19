"use server";
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const registerUser = async (payload) => {
  try {
    const userCollections = await dbConnect(collectionNameObj.userCollection);
    console.log("userCollections:", userCollections);

    const { email, password } = payload;
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    const existingUser = await userCollections.findOne({
      email: payload.email,
    });

    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    const newUser = await userCollections.insertOne(payload);

    return {
      success: true,
      message: "Account created successfully!",
      userId: newUser.insertedId.toString(),
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error.message || "Registration failed",
    };
  }
};
