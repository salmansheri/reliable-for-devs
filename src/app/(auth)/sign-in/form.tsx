"use client";


import { RegisterSchema, RegisterType } from "@/lib/validators/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import {toast} from '@/components/ui/use-toast'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginType } from "@/lib/validators/LoginSchema";
import { Button, buttonVariants } from "@/components/ui/button";



const FormPage= () => {
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState(false); 
    const form = useForm<LoginType>({
        resolver: zodResolver(LoginSchema), 
        defaultValues: {
            email: "", 
            password: "", 
        }
    })

   const onSubmit = (data: LoginType) => {
    signIn('credentials', {
        email: data.email, 
        password: data.password,
        callbackUrl: "/"
        
    })

    toast({
        title: "Sign in success", 
        variant: "success", 
    })

    
   }


   

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
     
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Email" />
              </FormControl>
              <FormDescription>Enter the Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter password" />
              </FormControl>
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <Separator className="my-5" />
      <p>
        {"New to Reliable?"}
        <Link
          href={"/sign-up"}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "cursor-pointer"
          )}
        >
          {"Sign up"}
        </Link>
      </p>
    </Form>
  );
};

export default FormPage;
