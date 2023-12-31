import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

// CSS
import "./globals.css";

export const metadata: Metadata = {
  title: "Form",
  description: "NextJs & Material UI Form",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
