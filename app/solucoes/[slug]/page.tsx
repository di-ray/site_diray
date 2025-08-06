import { client } from "@/tina/__generated__/databaseClient"
import { SolutionPageTemplate } from "@/components/solutions/solution-page-template"

type Props = {
  params: {
    slug: string
  }
}

export default async function SolutionPage({ params }: Props) {
  try {
    const tinaProps = await client.queries.solution({ relativePath: `${params.slug}.mdx` });
    const solutionsRes = await client.queries.solutionConnection();

    // Sanitiza os dados para garantir que são plain objects
    const plainTinaProps = {
      data: tinaProps?.data ? JSON.parse(JSON.stringify(tinaProps.data)) : {},
      query: tinaProps?.query ? (typeof tinaProps.query === "string" ? tinaProps.query : JSON.parse(JSON.stringify(tinaProps.query))) : "",
      variables: tinaProps?.variables ? JSON.parse(JSON.stringify(tinaProps.variables)) : {},
    };
    
    const plainSolutionsProps = {
      data: solutionsRes?.data ? JSON.parse(JSON.stringify(solutionsRes.data)) : {},
      query: solutionsRes?.query ? (typeof solutionsRes.query === "string" ? solutionsRes.query : JSON.parse(JSON.stringify(solutionsRes.query))) : "",
      variables: solutionsRes?.variables ? JSON.parse(JSON.stringify(solutionsRes.variables)) : {},
    };

    return <SolutionPageTemplate {...plainTinaProps} solutions={plainSolutionsProps} />
  } catch (error) {
    console.error("Error loading solution page data:", error);
    // Return a fallback page with empty data
    return <SolutionPageTemplate data={{}} query="" variables={{}} solutions={{ data: {}, query: "", variables: {} }} />
  }
}

export async function generateStaticParams() {
  const solutions = await client.queries.solutionConnection();
  
  if (!solutions?.data?.solutionConnection?.edges) {
    return [];
  }

  const edges = solutions.data.solutionConnection.edges;

  return edges.reduce<{ slug: string }[]>((acc, edge) => {
    if (edge && edge.node) {
      acc.push({ slug: edge.node._sys.filename });
    }
    return acc;
  }, []);
}
