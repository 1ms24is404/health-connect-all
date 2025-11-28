import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-health-mesh">
      <Header />
      <main>{children}</main>
    </div>
  );
}
