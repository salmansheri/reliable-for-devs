import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(3, { message: "Name should contain more than 3 characters"}).max(20).optional(), 
    password: z.string(), 
    email: z.string().endsWith(".com"),

})

export type RegisterType = z.infer<typeof RegisterSchema>; 

