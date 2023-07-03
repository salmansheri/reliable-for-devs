"use client";

import { ProjectFormSchema, ProjectFormType, SessionInterface } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

interface Props {
  type: string;
  currentUser: SessionInterface | null | Session;
}

const ProjectForm = ({ type, currentUser }: Props) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");
  const form = useForm<ProjectFormType>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      githubUrl: "",

      liveSiteUrl: "",
    },
  });

  const { mutate: createProject, isLoading: isCreating } = useMutation({
    mutationFn: async ({
      category,
      description,
      githubUrl,
      image,
      liveSiteUrl,
      title,
    }: ProjectFormType) => {
      const payload: ProjectFormType = {
        category,
        githubUrl,
        description,
        image,
        liveSiteUrl,
        title,
      };

      const { data } = await axios.post("/api/create-project", payload);

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            title: "Bad Request",
            description: "You are not allowed to that",
            variant: "destructive",
          });
        }

        if (error.response?.status === 401) {
          return toast({
            title: "Unauthorized",
            description: "You are not signed in please sign in ",
            variant: "destructive",
          });
        }

        if (error.response?.status === 422) {
          return toast({
            title: "Not Allowed",
            description: "Your are not allowed to do that",
            variant: "destructive",
          });
        }

        if (error.response?.status === 500) {
          return toast({
            title: "Internal Server Error",
            description: "An Error has Occured in the server",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Server side error",
        variant: "destructive",
      });
    },
    onSuccess: (data: ProjectFormType) => {
      router.push("/");
      router.refresh(); 
      return toast({
        title: "Successfully created",
        description: "Project has been Successfully created",
        variant: "success",
      });
    },
  });

  const onSubmit = async (data: ProjectFormType) => {
    const payload: ProjectFormType = {
      ...data,
      image: imageUrl,
    };
    createProject(payload);

    console.log(payload);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.includes("image")) {
      return toast({
        title: "Please upload an image file",
        description: "Looks like uploaded file is not an Image file",
        variant: "destructive",
      });
    }

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const result = fileReader.result as string;
      setImageUrl(result);
    };
  };

  return (
    <Card className="w-full p-5 my-10 flexStart">
      <Form {...form}>
        <form
          className="w-full flex flex-col space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flexStart form_image-container">
            <Label htmlFor="image" className="flexCenter form_image-label">
              {!imageUrl && "Choose a Poster for your Project"}
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              required={type === "create" ? true : false}
              className="form_image-input"
              onChange={(e) => handleChangeImage(e)}
            />

            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageUrl}
                className="sm:p-10 object-contain z-20"
                fill
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the project title" {...field} />
                </FormControl>
                <FormDescription>
                  Title must bigger than 3 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the project description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Title must bigger than 3 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the project description"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liveSiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Site Url</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Live site url" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="web development">
                      Web Development
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="items-start flex w-full">
            <Button type="submit" className="lg:w-fit w-full">
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin  text-white" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ProjectForm;
