import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppShell } from "./components/AppShell";

// Freight Big Pro - for H1 headings
const freightBigPro = localFont({
  src: [
    {
      path: "../../Fonts/Freight Big Pro/FreightBigProBook-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/Freight Big Pro/FreightBigProBook-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../Fonts/Freight Big Pro/FreightBigProMedium-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../Fonts/Freight Big Pro/FreightBigProMedium-Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../Fonts/Freight Big Pro/FreightBigProBold-Regular.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../Fonts/Freight Big Pro/FreightBigProBold-Italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-freight-big",
});

// GT Walsheim Pro - for body text and other headings
const gtWalsheimPro = localFont({
  src: [
    {
      path: "../../Fonts/GTWalsheimPro/GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/GTWalsheimPro/GTWalsheimPro-RegularOblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../Fonts/GTWalsheimPro/GTWalsheimPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../Fonts/GTWalsheimPro/GTWalsheimPro-MediumOblique.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../Fonts/GTWalsheimPro/GTWalsheimPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../Fonts/GTWalsheimPro/GTWalsheimPro-BoldOblique.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-gt-walsheim",
});

// Crimson Pro - for body text and other headings
const crimsonPro = localFont({
  src: [
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../Fonts/Crimson Pro/CrimsonPro-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-crimson",
});

export const metadata: Metadata = {
  title: "Healoxa - Simple habits for a healthier, stronger you.",
  description: "Healoxa is a health, wellness, and fitness blog sharing practical tips, expert-backed insights, nutrition guides, workouts, and healthy lifestyle advice to help you feel better, move better, and live well every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const saved = localStorage.getItem('theme'); const theme = saved === 'dark' ? 'dark' : 'light'; const root = document.documentElement; root.classList.toggle('dark', theme === 'dark'); root.classList.toggle('light', theme === 'light'); } catch {} })();",
          }}
        />
      </head>
      <body
        className={`${freightBigPro.variable} ${gtWalsheimPro.variable} ${crimsonPro.variable} antialiased`}
      >
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
