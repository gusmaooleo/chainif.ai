import type { Metadata } from "next";
import LogoHeader from "@/components/elements/logo-header";
import Footer from "@/components/structures/footer";
import MainWrapper from "@/components/structures/main";
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
        <div className="min-h-screen flex flex-col">
          <LogoHeader />
          <MainWrapper>
            {children}
          </MainWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
