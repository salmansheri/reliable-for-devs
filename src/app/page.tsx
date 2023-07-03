import ProjectCard from "@/components/project-card";
import prisma from "@/lib/prismaDB";
import { notFound } from "next/navigation";

export default async function Home() {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc', 
    }
  });
  // const projects = null;

  if (!projects) {
    return notFound();
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project?.id}
            id={project?.id}
            image={project?.image!}
            title={project?.title}
            name={project?.user?.name!}
            avatarUrl={project?.user?.image!}
            userId={project?.user?.id}
          />
        ))}
      </section>
      <h1>Loadmore</h1>
    </section>
  );
}
