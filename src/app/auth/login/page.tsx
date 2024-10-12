import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <section className="mx-auto max-w-md">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Log in
      </h2>
      <p className="mt-1 text-sm">
        Enter your email and password to start managing your e-commerce.
      </p>

      <LoginForm />
    </section>
  );
}
