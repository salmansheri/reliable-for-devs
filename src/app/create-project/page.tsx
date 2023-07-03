import Modal from "@/components/modal";
import ProjectForm from "@/components/project-form";
import { getCurrentUser } from "@/lib/session";
import { SessionInterface } from "@/types";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreatePage() {
    const currentUser: SessionInterface | null | Session = await getCurrentUser()

    if(!currentUser?.user) {
        redirect("/")
    }
    return (
        <Modal>
            <h3 className="modal-head-text">
                Create a New Project

            </h3>
            <ProjectForm 
                type="create"
                currentUser={currentUser}
            />
        </Modal>
    )
} 