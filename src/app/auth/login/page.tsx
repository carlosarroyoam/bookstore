import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <section className="mx-auto max-w-md">
      <h2 className="text-2xl font-bold tracking-tight">
        Log into your account
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your email below to log into your account.
      </p>

      <LoginForm />
    </section>
  );
}
