import { createDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { MemoryLevel } from "memory-level";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

if (!token || !owner || !repo || !branch) {
  throw new Error(
    "Missing required environment variables. Make sure you have set GITHUB_PERSONAL_ACCESS_TOKEN, GITHUB_OWNER (or VERCEL_GIT_REPO_OWNER), GITHUB_REPO (or VERCEL_GIT_REPO_SLUG), and GITHUB_BRANCH (or VERCEL_GIT_COMMIT_REF)."
  );
}

export default createDatabase({
  gitProvider: new GitHubProvider({
    branch: branch as string,
    owner: owner as string,
    repo: repo as string,
    token: token as string,
  }),
  databaseAdapter: new MemoryLevel<string, Record<string, any>>(),
  namespace: branch as string,
});
