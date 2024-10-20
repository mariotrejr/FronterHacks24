import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bin Fiesta",
  description: "Welcome to Bin Fiesta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="images/recyclepng.png" sizes="any" /> {/* Corrected Path */}
      </Head>
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
