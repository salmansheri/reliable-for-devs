import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismaDB";
import { ProjectFormSchema } from "@/types";
import { z } from "zod";
import axios from 'axios'; 

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    
    if (!currentUser?.email) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    
    const body = await request.json();
    
    const { description, title, category, githubUrl, image, liveSiteUrl } =
    ProjectFormSchema.parse(body);
    
    if (
      !description ||
      !title ||
      !category ||
      !githubUrl ||
      !image ||
      !liveSiteUrl
      ) {
        return new Response("Bad Request", {
          status: 400,
        });
      }
     

    const user = await prisma.project.create({
      data: {
        description,
        title,
        category,
        githubUrl,
        image,
        liveSiteUrl,
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Not Allowed", {
        status: 422,
      });
    }

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
