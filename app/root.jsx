import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import styles from "~/styles/global.css?url";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.ico" },
];

export function Layout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </ThemeProvider>
  );
}
