import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { RedisLevel } from "upstash-redis-level";
import { Redis } from "@upstash/redis";
import { GitHubProvider } from "tinacms-gitprovider-github";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

if (!isLocal) {
  if (!token || !owner || !repo || !branch) {
    throw new Error(
      "Missing required environment variables. Make sure you have set GITHUB_PERSONAL_ACCESS_TOKEN, GITHUB_OWNER (or VERCEL_GIT_REPO_OWNER), GITHUB_REPO (or VERCEL_GIT_REPO_SLUG), and GITHUB_BRANCH (or VERCEL_GIT_COMMIT_REF)."
    );
  }
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: branch as string,
        owner: owner as string,
        repo: repo as string,
        token: token as string,
      }),
      databaseAdapter: new RedisLevel<string, Record<string, any>>({
        redis: new Redis({
          url: process.env.KV_REST_API_URL as string,
          token: process.env.KV_REST_API_TOKEN as string,
        }),
      }),
      namespace: branch as string,
    });
