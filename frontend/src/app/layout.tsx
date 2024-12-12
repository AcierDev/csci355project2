import type { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import "./globals.css";
import Navbar from "../components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  title: "EGGTech - Elevating Your Tech",
  description: "Discover cutting-edge tech at unbeatable prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
