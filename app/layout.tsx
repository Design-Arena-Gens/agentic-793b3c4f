import "./globals.css";
import type { Metadata } from "next";
import { Great_Vibes, Manrope } from "next/font/google";
import { PropsWithChildren } from "react";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature"
});

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Signature Ouabas Hakima",
  description:
    "Signature électronique élégante générée pour Ouabas Hakima avec options de téléchargement."
};

function AppLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body
        className={`${manrope.className} ${manrope.variable} ${greatVibes.variable} bg-neutral-950 text-neutral-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export default AppLayout;
