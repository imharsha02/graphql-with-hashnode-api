import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DetailsProvider from "./context/DetailsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  searchedUser=""
}: {
  children: React.ReactNode;
  searchedUser?:string
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DetailsProvider searchedUser={searchedUser}>{children}</DetailsProvider>
      </body>
    </html>
  );
}
