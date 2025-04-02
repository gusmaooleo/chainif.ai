import type { Metadata } from "next";
import Footer from "@/components/footer";
import MainWrapper from "@/components/main";
import Header from "@/components/header";
import GradientCanvas from "@/components/canvas/GradientCanvas";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chainif.AI",
  description: "Validate AI generated content and authorial texts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <GradientCanvas />
          <Header />
          <MainWrapper>
            {children}
          </MainWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
