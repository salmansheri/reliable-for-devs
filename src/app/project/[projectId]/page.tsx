import UserAvatar from "@/components/UserAvatar";
import Modal from "@/components/modal";
import ProjectActions from "@/components/project-actions";
import ProjectCard from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismaDB";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
    const currentUser = await getCurrentUser(); 
  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
    },

    include: {
      user: {
        include: {
          projects: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  const filteredProjects = project?.user?.projects.filter(
    (item) => item.id !== params.projectId
  );

  console.log(project);

  if (!project) {
    return notFound();
  }

  return (
    <div>
      <Modal>
        <div className="flex items-start flex-col gap-10">
          <div className="flexStart gap-2 w-full justify-between">
            <UserAvatar
              src={project?.user?.image!}
              username={project.user?.name!}
            />
            <div className="flex flex-row justify-between w-full">
              <div className="w-full">
                <p className="text-xl font-bold">{project?.title}</p>
                <p>{project?.user?.name}</p>
                <p className="bg-primary-purple px-2 rounded-full inline-flex items-center justify-center">
                  {project?.category}
                </p>
              </div>
            </div>
            {currentUser?.id === project?.user?.id && (

              <div className="">
                <ProjectActions 
                    projectId={project?.id}
                />
              </div>
            )}
          </div>
          <div>
            <Image
              alt={project?.title}
              src={project?.image!}
              width={1000}
              height={500}
              priority
              className="rounded-3xl"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <p className="text-center">{project?.description}</p>
          </div>
          <div className="flex flex-row items-center justify-center w-full">
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "flex gap-1"
              )}
              href={project?.githubUrl!}
            >
              <GitHubLogoIcon className="h-5 w-5" />
              Github
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                })
              )}
              href={project?.liveSiteUrl!}
            >
              Live Site
            </Link>
          </div>
          <div>
            <div className="flexBetween">
              <h4>
                More by{" "}
                <span className="text-primary-purple font-bold">
                  {project?.user?.name}
                </span>{" "}
              </h4>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                  })
                )}
                href="/"
              >
                More Like This
              </Link>
            </div>
            <div className="projects-grid">
              {filteredProjects?.slice(0, 4).map((item) => (
                <ProjectCard
                  id={item?.id}
                  title={item?.title}
                  key={item?.id}
                  image={item?.image!}
                  name={item?.user?.name!}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
