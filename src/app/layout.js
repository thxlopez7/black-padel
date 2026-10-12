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
  title: "Circuito R.D Eventos",
  description: "Sistema de gestión y fixture de torneos de pádel - R.D Eventos",
  openGraph: {
    title: "Circuito R.D Eventos",
    description: "Sistema de gestión y fixture de torneos de pádel - R.D Eventos",
    url: "https://www.rdeventos.online",
    siteName: "R.D Eventos",
    images: [
      {
        url: "/RD.jpeg",
        width: 800,
        height: 600,
        alt: "R.D Eventos",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${oswald.variable}`}>
      <body className="font-sans font-montserrat">{children}</body>
    </html>
  );
}
