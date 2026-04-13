"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  );
}
