import Link from "next/link";

import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <section className="mx-auto max-w-md">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Log in
      </h2>
      <p className="mt-1 text-sm">
        Enter your email and password to start managing your e-commerce.
      </p>

      <LoginForm />

      <div className="mt-6 flex justify-center">
        <Button variant={"link"} asChild>
          <Link href="/auth/forgot-password">Forgot your password?</Link>
        </Button>
      </div>
    </section>
  );
}
