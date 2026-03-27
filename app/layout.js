import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Wepachi — Virtual Coquí Pet",
  description:
    "A Puerto Rican virtual pet inspired by 90s handheld electronic toys. Raise your pixel-art coquí frog — feed it pastelillos, fuel it with cafecito, and make it dance salsa!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={silkscreen.variable}>
      <body style={{ margin: 0, padding: 0, background: "#1a1a2e" }}>
        {children}
      </body>
    </html>
  );
}
