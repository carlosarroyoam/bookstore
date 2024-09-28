import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="container py-8">{children}</main>
      <Footer />
    </div>
  );
}
