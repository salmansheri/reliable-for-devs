"use client";

import { NavLinks } from "@/contants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import AuthProviders from "./AuthProviders";

import { ModeToggle } from "@/Providers/dark-mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import UserAvatar from "./UserAvatar";
import { buttonVariants } from "./ui/button";
interface NavbarProps {
  currentUser: Session | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  // const session = await getCurrentUser();
  // console.log(session);
  const session = false;
  const { theme, setTheme } = useTheme();

  return (
    <nav className="dark:text-white flexBetween navbar ">
      <div className="flex-1  flexStart gap-10">
        <Link href="#">
          <Image
            src={theme === "light" ? "/logo.svg" : "/logo-purple.svg"}
            width={115}
            height={43}
            alt="flexibble"
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        <ModeToggle />
        {currentUser ? (
          <>
            {/* <UserAvatar 
              src={session?.user?.image!}
              username={session.user?.name!}
            /> */}
            <Link
              className={buttonVariants({
                variant: "default",
              })}
              href="/create-project"
            >
              Share work
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserAvatar
                  src={currentUser?.user?.image!}
                  username={currentUser?.user?.name!}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push(`/profile`)}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Signout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <AuthProviders />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
