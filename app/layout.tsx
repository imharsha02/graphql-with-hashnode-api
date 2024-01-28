import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DetailsProvider from "./context/DetailsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HashProfiles",
  description: "Fetches user details from hashnode api and renders them",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-5 overflow-hidden mx-auto md:px-24 md:py-16`}>
        <DetailsProvider>{children}</DetailsProvider>
      </body>
    </html>
  );
}
