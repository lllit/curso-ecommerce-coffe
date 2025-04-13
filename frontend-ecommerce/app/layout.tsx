import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoffeDream | CoffeShop",
  description: "Bienvenidos a mi E-Commerce por Matias Perez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar></Navbar>
          {children}
          <Toaster></Toaster>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
