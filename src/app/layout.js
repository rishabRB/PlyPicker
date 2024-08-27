import { Inter } from "next/font/google";
import "./globals.css";
import SnackbarProvider from "./provider/SnackbarProvider";



// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PlyPicker",
  description: "Plypicker internship assginment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider />
        {children}
        </body>
    </html>
  );
}
