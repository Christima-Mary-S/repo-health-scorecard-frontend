"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RepoSearchForm() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const [owner, repo] = input.trim().split("/");
    if (owner && repo) {
      router.push(`/repo/${owner}/${repo}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="owner/repo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Analyse
      </button>
    </form>
  );
}
