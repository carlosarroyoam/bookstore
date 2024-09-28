"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import axios from "@/lib/axios";
import { loginFormSchema, LoginFormSchemaType } from "@/lib/zod";
import { User } from "@/types/User";

const loginFn = async (values: LoginFormSchemaType) => {
  let deviceFingerprint = localStorage.getItem("device_fingerprint");

  if (!deviceFingerprint) {
    localStorage.setItem("device_fingerprint", uuidv4());
    deviceFingerprint = localStorage.getItem("device_fingerprint");
  }

  const {
    data: { user },
  } = await axios.post("/auth/login", {
    email: values.email,
    password: values.password,
    device_fingerprint: deviceFingerprint,
  });

  return {
    user_id: user.user_id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    user_role: user.user_role,
    user_role_id: user.user_role_id,
  } as User;
};

const LoginForm = () => {
  const { createSession } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: logIn, isPending } = useMutation({
    mutationFn: (values: LoginFormSchemaType) => loginFn(values),
    onSuccess: (user) => {
      createSession(user);
      router.refresh();
      router.push("/dashboard");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 422) {
          if (err.response?.data.details["email"]) {
            form.setError("email", {
              message: err.response?.data.details["email"],
            });
          }

          if (err.response?.data.details["password"]) {
            form.setError("password", {
              message: err.response?.data.details["password"],
            });
          }
        } else {
          if (err.response?.data.message) {
            form.setError("root", {
              message: err.response?.data.message,
            });
          }
        }
      }
    },
  });

  const onSubmit = (values: LoginFormSchemaType) => logIn(values);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">
        Log into your account
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your email below to log into your account.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            Log in
            {isPending && <ReloadIcon className="ml-4 size-4 animate-spin" />}
          </Button>
        </form>
      </Form>

      {form.formState.errors.root ? (
        <Alert variant="destructive" className="mt-8">
          <ExclamationTriangleIcon className="size-4" />
          <AlertDescription>
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      ) : null}
    </>
  );
};

export default LoginForm;
