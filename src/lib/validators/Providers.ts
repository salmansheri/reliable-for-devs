import { z } from "zod";

export const ProvidersValidator = z.object({
    id: z.string(), 
    name: z.string(), 
    type: z.string(), 
    signinUrl: z.string(), 
    callbackUrl: z.string(), 
    signInUrlParams: z.record(z.string()).nullable(), 

})

export type ProviderType = z.infer<typeof ProvidersValidator>; 

