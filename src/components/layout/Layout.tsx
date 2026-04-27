import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatbotPlaceholder } from "../ChatbotPlaceholder";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <Footer />
      <ChatbotPlaceholder />
    </div>
  );
}
