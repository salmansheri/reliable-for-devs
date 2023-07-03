import { User, Session } from "next-auth";
import type { UserType } from "@/lib/validators/SessionValidator";
import { FormValidator } from "@/lib/validators/form";
import { z } from "zod";
import { Project } from "@prisma/client";

export type FormState = z.infer<typeof FormValidator>; 

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedInUrl: string | null;
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}



export interface SessionInterface extends Session {
    user: User & UserType
}

export interface ProjectForm {
    title: string; 
    description: string; 
    image: string; 
    liveSiteUrl: string; 
    githubUrl: string; 
    category: string; 
}

export const ProjectFormSchema = z.object({
  title: z.string().min(3, {
    message: "Project title must be above 3 characters"
  }).max(50, {
    message: "Project title must be less that 50 characters"
  }), 
  description: z.string().min(3, {
    message: "Project title must be above 3 characters"
  }).max(1000, {
    message: "Project title must be less that 1000 characters"
  }), 
  image: z.string().optional().nullable(), 
  liveSiteUrl: z.string().optional(), 
  githubUrl: z.string().optional(), 
  category: z.string().optional(), 

})


export type ProjectFormType = z.infer<typeof ProjectFormSchema>; 

export interface SingleProjectInterface {
  project: Project, 
  user: User, 
}
