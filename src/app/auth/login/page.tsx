import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <section className="mx-auto max-w-md">
      <h2 className="text-2xl font-bold tracking-tight">Log into</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your email and password to start managing your e-commerce.
      </p>

      <LoginForm />
    </section>
  );
}
