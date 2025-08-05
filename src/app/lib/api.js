import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
  timeout: 10000,
});

export async function fetchScore(owner, repo) {
  const response = await api.get(`/api/score/${owner}/${repo}`);
  return response.data;
}
