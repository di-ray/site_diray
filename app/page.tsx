import dynamic from "next/dynamic";
import { client } from "../tina/__generated__/databaseClient";
import { SolutionsSection } from "@/components/solutions/solutions-section";

const Page = dynamic(() => import("../components/page").then(mod => mod.Page), { ssr: false });

export default async function Home() {
  try {
    const res = await client.queries.page({ relativePath: "home.mdx" });
    const solutionsRes = await client.queries.solutionConnection({});

    // Sanitiza os dados para garantir que são plain objects
    const plainData = res?.data ? JSON.parse(JSON.stringify(res.data)) : {};
    const plainQuery = res?.query ? (typeof res.query === "string" ? res.query : JSON.parse(JSON.stringify(res.query))) : "";
    const plainVariables = res?.variables ? JSON.parse(JSON.stringify(res.variables)) : {};
    
    const plainSolutionsData = solutionsRes?.data ? JSON.parse(JSON.stringify(solutionsRes.data)) : {};
    const plainSolutionsQuery = solutionsRes?.query ? (typeof solutionsRes.query === "string" ? solutionsRes.query : JSON.parse(JSON.stringify(solutionsRes.query))) : "";
    const plainSolutionsVariables = solutionsRes?.variables ? JSON.parse(JSON.stringify(solutionsRes.variables)) : {};

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
  } catch (error) {
    console.error("Error loading home page data:", error);
    // Return a fallback page with empty data
    return (
      <>
        <Page
          data={{ page: { blocks: [] } }}
          query=""
          variables={{}}
        />
      </>
    );
  }
}
