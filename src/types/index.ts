import { User, Session } from "next-auth";
import type { UserType } from "@/lib/validators/SessionValidator";
import { FormValidator } from "@/lib/validators/form";
import { z } from "zod";

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
    linkedinUrl: string | null;
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