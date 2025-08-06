import { TinaNodeBackend } from "@tinacms/datalayer";
import { LocalBackendAuthProvider } from "../../../../tina/auth";
import databaseClient from "../../../../tina/__generated__/databaseClient";
import { NextRequest } from "next/server";

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

async function handleRequest(request: NextRequest) {
  const url = new URL(request.url);
  const body = request.method !== 'GET' ? await request.text() : undefined;
  
  // Create a promise that resolves with the response
  return new Promise((resolve, reject) => {
    const req = {
      method: request.method,
      url: url.pathname + url.search,
      query: Object.fromEntries(url.searchParams),
      body: body,
      headers: Object.fromEntries(request.headers.entries()),
    };

    const res = {
      status: (code: number) => ({
        json: (data: any) => {
          resolve(Response.json(data, { status: code }));
        },
        end: (data?: any) => {
          resolve(new Response(data, { status: code }));
        }
      }),
      json: (data: any) => {
        resolve(Response.json(data));
      },
      end: (data?: any) => {
        resolve(new Response(data));
      },
      setHeader: () => {}, // Headers are handled differently in App Router
    };

    try {
      handler(req as any, res as any);
    } catch (error) {
      reject(error);
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    return await handleRequest(request);
  } catch (error) {
    console.error("TinaCMS API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handleRequest(request);
  } catch (error) {
    console.error("TinaCMS API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    return await handleRequest(request);
  } catch (error) {
    console.error("TinaCMS API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    return await handleRequest(request);
  } catch (error) {
    console.error("TinaCMS API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
