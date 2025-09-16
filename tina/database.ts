import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { RedisLevel } from "upstash-redis-level";

// Consider multiple flags that indicate a local Tina build
const isLocalFlag =
  process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
  process.env.TINA_CLI_BUILD === "true" ||
  process.env.NEXT_PUBLIC_TINA_LOCAL === "true";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "dependabot/npm_and_yarn/multi-544f560e85";

// If required env vars are missing, prefer local database to avoid hard failures during local builds
const missingGithubEnv = !token || !owner || !repo || !branch;
const useLocal = isLocalFlag || missingGithubEnv;

// Configuração do banco de dados
const database = useLocal
  ? createLocalDatabase()
  : (() => {
      // Para produção com Redis KV
      const kvUrl = process.env.KV_REST_API_URL;
      const kvToken = process.env.KV_REST_API_TOKEN;

      if (!kvUrl || !kvToken) {
        console.warn(
          "[Tina] KV_REST_API_URL or KV_REST_API_TOKEN missing; falling back to local database for this build."
        );
        return createLocalDatabase();
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
