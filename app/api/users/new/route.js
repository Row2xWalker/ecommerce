import { connectToDB } from "@utils/database";
import User from "@models/user";

export const POST = async (req) => {
  const { username, password, email, role } = await req.json();

  try {
    await connectToDB();
    const newUser = new User({
      username,
      password,
      email,
      role,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new User", { status: 500 });
  }
};
