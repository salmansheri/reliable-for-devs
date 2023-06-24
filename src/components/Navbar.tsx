import { NavLinks } from "@/contants";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import AuthProviders from "./AuthProviders";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const session = {};
  return (
    <nav className="flexBetween navbar ">
      <div className="flex-1  flexStart gap-10">
        <Link href="#">
          <Image src="/logo.svg" width={115} height={43} alt="flexibble" />
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
        {session ? (
            <>
            Userphoto
            <Link href="/create-project">
                Share work
            </Link>
            </>

        ): (
            <AuthProviders />
        

        )}
      </div>
    </nav>
  );
};

export default Navbar;
