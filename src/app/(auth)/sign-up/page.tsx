import FormPage from "@/components/Form";
import { Card } from "@/components/ui/card";


export default function SignUpPage() {
    return(
        <section className="min-h-screen flex items-center justify-center flex-col space-y-3">
           
            <Card className="p-5 w-full  lg:w-[50%]">

            <FormPage />
            </Card>
        </section>
    )
}