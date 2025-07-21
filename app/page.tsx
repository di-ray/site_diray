import dynamic from "next/dynamic";
import { client } from "../tina/__generated__/databaseClient";
import { SolutionsSection } from "@/components/solutions/solutions-section";

const Page = dynamic(() => import("../components/page").then(mod => mod.Page), { ssr: false });

export default async function Home() {
  const res = await client.queries.page({ relativePath: "home.mdx" });
  const solutionsRes = await client.queries.solutionConnection();

  // Sanitiza os dados para garantir que são plain objects
  const plainData = JSON.parse(JSON.stringify(res.data));
  const plainQuery = typeof res.query === "string" ? res.query : JSON.parse(JSON.stringify(res.query));
  const plainVariables = JSON.parse(JSON.stringify(res.variables));
  
  const plainSolutionsData = JSON.parse(JSON.stringify(solutionsRes.data));
  const plainSolutionsQuery = typeof solutionsRes.query === "string" ? solutionsRes.query : JSON.parse(JSON.stringify(solutionsRes.query));
  const plainSolutionsVariables = JSON.parse(JSON.stringify(solutionsRes.variables));

  return (
    <>
      <Page
        // https://github.com/vercel/next.js/issues/47447
        data={plainData}
        query={plainQuery}
        variables={plainVariables}
      />
      
    </>
  );
}
