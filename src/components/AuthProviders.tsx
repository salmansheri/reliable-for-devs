"use client";

import { ProviderType } from "@/lib/validators/Providers";

import { signIn } from "next-auth/react";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface AuthProvidersProps {}

type Providers = Record<string, ProviderType>;

const AuthProviders: FC<AuthProvidersProps> = ({}) => {
  const router = useRouter(); 

  

 

  return (
    <Button
      onClick={() => router.push("/sign-up")}
    >
      
      Join
    </Button>
  );
};

export default AuthProviders;
