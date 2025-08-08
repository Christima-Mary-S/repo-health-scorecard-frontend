import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Repo-Health Scorecard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
