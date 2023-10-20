import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from 'express'; // Import Request and Response types

const prisma = new PrismaClient();

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Respond with a success message or token
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "User registration failed" });
  }
}
