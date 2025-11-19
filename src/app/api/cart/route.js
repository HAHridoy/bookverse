import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect, collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    console.log("GET Cart - Session:", session);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartCollection = await dbConnect(collectionNameObj.cartCollection);
    const userCart = await cartCollection.findOne({
      userEmail: session.user.email,
    });

    if (!userCart) {
      return Response.json({ items: [], total: 0 });
    }

    return Response.json(userCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return Response.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    console.log("POST Cart - Session:", session);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId, book_name, price, image } = await req.json();

    const cartCollection = await dbConnect(collectionNameObj.cartCollection);

    // Find existing cart for user
    let userCart = await cartCollection.findOne({
      userEmail: session.user.email,
    });

    if (!userCart) {
      // Create new cart
      const newCart = {
        userEmail: session.user.email,
        items: [
          {
            bookId,
            book_name,
            price,
            image,
            quantity: 1,
          },
        ],
        total: price,
        createdAt: new Date(),
      };
      await cartCollection.insertOne(newCart);
      return Response.json({
        success: true,
        message: "Added to cart",
        cart: newCart,
      });
    }

    // Check if book already in cart
    const existingItem = userCart.items.find((item) => item.bookId === bookId);

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      userCart.items.push({
        bookId,
        book_name,
        price,
        image,
        quantity: 1,
      });
    }

    // Recalculate total
    userCart.total = userCart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    userCart.updatedAt = new Date();

    await cartCollection.updateOne(
      { userEmail: session.user.email },
      { $set: userCart }
    );

    return Response.json({
      success: true,
      message: "Added to cart",
      cart: userCart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return Response.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);

    console.log("DELETE Cart - Session:", session);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await req.json();

    const cartCollection = await dbConnect(collectionNameObj.cartCollection);

    let userCart = await cartCollection.findOne({
      userEmail: session.user.email,
    });

    if (!userCart) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    // Remove item from cart
    userCart.items = userCart.items.filter((item) => item.bookId !== bookId);

    // Recalculate total
    userCart.total = userCart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    userCart.updatedAt = new Date();

    if (userCart.items.length === 0) {
      // Delete cart if empty
      await cartCollection.deleteOne({ userEmail: session.user.email });
    } else {
      await cartCollection.updateOne(
        { userEmail: session.user.email },
        { $set: userCart }
      );
    }

    return Response.json({
      success: true,
      message: "Removed from cart",
      cart: userCart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return Response.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    console.log("PUT Cart - Session:", session);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId, quantity } = await req.json();

    const cartCollection = await dbConnect(collectionNameObj.cartCollection);

    let userCart = await cartCollection.findOne({
      userEmail: session.user.email,
    });

    if (!userCart) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    // Find and update item quantity
    const item = userCart.items.find((item) => item.bookId === bookId);

    if (!item) {
      return Response.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    if (quantity <= 0) {
      // Remove if quantity is 0 or less
      userCart.items = userCart.items.filter((item) => item.bookId !== bookId);
    } else {
      item.quantity = quantity;
    }

    // Recalculate total
    userCart.total = userCart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    userCart.updatedAt = new Date();

    if (userCart.items.length === 0) {
      // Delete cart if empty
      await cartCollection.deleteOne({ userEmail: session.user.email });
    } else {
      await cartCollection.updateOne(
        { userEmail: session.user.email },
        { $set: userCart }
      );
    }

    return Response.json({
      success: true,
      message: "Quantity updated",
      cart: userCart,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return Response.json(
      { error: "Failed to update quantity" },
      { status: 500 }
    );
  }
}
