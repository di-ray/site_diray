import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { RedisLevel } from "upstash-redis-level";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

if (!isLocal && (!token || !owner || !repo || !branch)) {
  throw new Error(
    "Missing required environment variables. Make sure you have set GITHUB_PERSONAL_ACCESS_TOKEN, GITHUB_OWNER (or VERCEL_GIT_REPO_OWNER), GITHUB_REPO (or VERCEL_GIT_REPO_SLUG), and GITHUB_BRANCH (or VERCEL_GIT_COMMIT_REF)."
  );
}

// Configuração do banco de dados
const database = isLocal
  ? createLocalDatabase()
  : (() => {
      // Para produção com Redis KV
      const kvUrl = process.env.KV_REST_API_URL;
      const kvToken = process.env.KV_REST_API_TOKEN;
      
      if (!kvUrl || !kvToken) {
        throw new Error(
          "Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variables for production mode"
        );
      }
      
      return createDatabase({
        gitProvider: new GitHubProvider({
          branch: branch as string,
          owner: owner as string,
          repo: repo as string,
          token: token as string,
        }),
        databaseAdapter: new RedisLevel({
          namespace: branch,
          redis: {
            url: kvUrl,
            token: kvToken,
          },
          debug: process.env.DEBUG === "true" || false,
        }),
        namespace: branch as string,
      });
    })();

export default database;
