"use client";

import { cn } from "@/lib/utils";
import { RegisterSchema, RegisterType } from "@/lib/validators/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, buttonVariants } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginType } from "@/lib/validators/LoginSchema";

interface FormProps {
  isLogin?: boolean; 
}

const FormPage: React.FC<FormProps> = ({
  isLogin
}) => {
  const router = useRouter(); 
  const actionLabel = isLogin ? "Sign in" : "Sign up";

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema || LoginSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const { mutate: Register, isLoading: isRegister } = useMutation({
    mutationFn: async ({ name, email, password }: RegisterType) => {
      const payload: RegisterType = {
        name,
        email,
        password,
      };
      const { data } = await axios.post("/api/register", payload);
      return data;
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        if(error?.response?.status === 400) {
          return toast({
            title: "User already Exists", 
            description: "Looks like email id already exist Please Sign in", 
            variant: "destructive",
          })

        }

        if(error?.response?.status===422) {
          return toast({
            title: "Invalid Credentials", 
            description: "Please Enter Valid Credentials", 
            variant: "destructive", 
          })
        }

        if(error?.response?.status=== 500) {
          return toast({
            title: "Internal Server Error", 
            description:"Error occured in the server", 
            variant: "destructive"
          })
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Invalid Credentials",
        variant: "destructive",
      });
    },
    onSuccess: (data: RegisterType) => {
      router.push("/sign-in")
      return toast({
        title: "Successfully registered",
        variant: "success",
      });
    },
  });

  const onRegister = (data: RegisterType) => {
    
      console.log(data.password)
      const payload: RegisterType = {
        name: data.name,
        password: data.password,
        email: data.email,
      };

     Register(payload); 

      

      
    }

    const onLogin = (data: LoginType) => {
      console.log(data)

    //   signIn('credentials', {
    //     email: data.email, 
    //     password: data.password, 
    //     callbackUrl: "/"
    //   }).then((callback) => {
    //     if(callback?.ok) {
    //       toast({
    //         title: "Sign in successfull",
    //         variant: "success", 
    //       })

    //     }
    //   })
    }
  

  return (
    <Form {...form}>
      <form onSubmit={isLogin ? form.handleSubmit(onLogin) : form.handleSubmit(onRegister)} className="space-y-8">
        {!isLogin && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the name" {...field} />
                </FormControl>
                <FormDescription>Name of the User</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
          {isRegister ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            actionLabel
          )}
        </Button>
      </form>
      <Separator className="my-5" />
      <p>
        {isLogin ? "New to Reliable?" : "Already Have an Account?"}
        <Link
          href={isLogin ? "/sign-up" : "/sign-in"}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "cursor-pointer"
          )}
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </Form>
  );
};

export default FormPage;
