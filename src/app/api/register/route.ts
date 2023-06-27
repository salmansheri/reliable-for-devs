import prisma from "@/lib/prismaDB";
import { ZodError } from "zod";
import { RegisterSchema } from "@/lib/validators/register";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = RegisterSchema.parse(body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return new Response("User already exists", {
        status: 400,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(newUser), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid Credentials", {
        status: 422,
      });
    }

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
