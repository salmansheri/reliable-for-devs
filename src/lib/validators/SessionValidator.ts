import { z } from "zod";

export const SessionValidator = z.object({
    id: z.string(), 
    name: z.string(), 
    email: z.string(), 
    avatarUrl: z.string(), 
})

export type UserType = z.infer<typeof SessionValidator>; 

