import { z } from 'zod'; 

export const ProjectSchema = z.object({
    title: z.string().min(3, { message: "Title should greater than 3 characters"}).max(10, { message: "Title should lesser than 10 characters"}), 
    description: z.string().min(3, { message: "Description should greater than 3 characters"}), 
    image: z.string().optional(), 
    githubUrl: z.string().optional(), 
    category: z.string().optional(), 


})

export type ProjectType = z.infer<typeof ProjectSchema>; 
