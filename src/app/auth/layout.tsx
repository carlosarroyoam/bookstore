import Footer from "@/components/footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[1fr_auto]">
      <main className="container py-16">{children}</main>
      <Footer />
    </div>
  );
}
