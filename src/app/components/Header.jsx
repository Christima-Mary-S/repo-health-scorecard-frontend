import Link from "next/link";
import RepoSearchForm from "./RepoSearchForm";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/">
          <span className="text-2xl font-bold">Repo-Health</span>
        </Link>
        {/* Public search form */}
        <div className="w-1/2">
          <RepoSearchForm />
        </div>
      </div>
    </header>
  );
}
