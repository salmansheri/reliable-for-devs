import { z } from "zod";

export const FooterLinksValidator = z.object({
    title: z.string(), 
    links: z.array(z.string()), 
}); 

export type FooterLinksType = z.infer<typeof FooterLinksValidator>; 
