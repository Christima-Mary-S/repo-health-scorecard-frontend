import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Repo-Health Scorecard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-slate-200">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
