import { Card } from "@/components/ui/card";
import FormPage from "./form";

export default function SignInPage() {
    return(
        <section className="min-h-screen flex items-center justify-center px-5">
            <Card className="lg:w-[50%] w-full p-5">
                <FormPage />
                </Card>
            
        </section>
    )
}