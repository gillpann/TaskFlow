import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Task Flow",
  description: "A simple and effective task management application",
  icons: [
    { rel: "icon", type: "image/x-icon", url: "/favicon.ico" }, 
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon.png",
    }, 
    { rel: "apple-touch-icon", sizes: "512x512", url: "/favicon-512x512.png" }, 
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}