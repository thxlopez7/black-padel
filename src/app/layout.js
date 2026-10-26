import { Montserrat, Oswald } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata = {
  metadataBase: new URL("https://www.rdeventos.online"),
  title: "Circuito Black Padel",
  description: "Circuito Black Padel",
  openGraph: {
    title: "Circuito Black Padel",
    description: "Circuito Black Padel",
    url: "https://www.rdeventos.online",
    siteName: "Circuito Black Padel",
    images: [
      {
        url: "https://www.rdeventos.online/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Circuito Black Padel",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circuito Black Padel",
    description: "Circuito Black Padel",
    images: ["https://www.rdeventos.online/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${oswald.variable}`}>
      <body className="font-sans font-montserrat">{children}</body>
    </html>
  );
}
