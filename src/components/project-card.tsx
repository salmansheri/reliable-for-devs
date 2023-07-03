"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import UserAvatar from "./UserAvatar";

interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  name?: string;
  avatarUrl?: string;
  userId?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
}) => {
    console.log(name)
  const router = useRouter();
  return (
    <div className="flex-center flex-col rounded-2xl drop-shadow-card w-[314px] h-[314px] relative cursor-pointer group">
      <div onClick={() => router.push(`/project/${id}`)}>
        <Image
          src={image}
          alt={title}
          fill
          className=" object-cover rounded-2xl"
        />
        <div className="hidden group-hover:flex profile_card-title  text-black  ">
          <p>{title}
            
          </p>
          <UserAvatar src={avatarUrl!} username={name as string} />
        </div>
      </div>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm  dark:text-white text-black">
        <Link href={`/profile/${userId}`}>
            {name}

        </Link>
      </div>
      <div className="flexCenter gap-3 absolute left-2 border border-black rounded-full top-2 text-black">
        <div className="flexCenter gap-2">
            <Image 
                src="/hearth.svg"
                width={20}
                height={15}
                alt="heart"
            />
            <p>522</p>

        </div>
        <div className="flexCenter gap-2 text-black">
          <Image 
            src="/eye.svg"
            width={13}
            height={12}
            alt="eye"

          />
          <p>5.2k</p>

        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
