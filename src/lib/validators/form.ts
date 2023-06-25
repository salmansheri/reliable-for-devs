import { z } from "zod";

export const FormValidator = z.object({
    title: z.string(), 
    description: z.string(), 
    image: z.string(), 
    liveSiteUrl: z.string(), 
    githubUrl: z.string(), 
    category: z.string()
})

