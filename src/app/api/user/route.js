import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { auth } from "@/auth";

// Handle POST requests
export async function POST(request) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await connectToDatabase();

  const { firstName, lastName, birthDate, address, phoneNumber } = await request.json();

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      firstName,
      lastName,
      birthDate,
      address,
      phoneNumber,
      email: session.user.email,
    },
    { new: true, upsert: true }
  );

  return new Response(JSON.stringify({ message: "Informations mises à jour", user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET(req) {
  const session = await auth();
  
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  
  await connectToDatabase();
  
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }
  
  return new Response(JSON.stringify(user), { status: 200 });
}
