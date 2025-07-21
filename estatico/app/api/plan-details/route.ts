import { NextResponse } from "next/server"
import { CMSService } from "@/lib/cms-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageId = searchParams.get("pageId")
  const planId = searchParams.get("planId")

  if (!pageId || !planId) {
    return NextResponse.json({ error: "Missing pageId or planId parameter" }, { status: 400 })
  }

  const cmsService = new CMSService()
  const planDetails = await cmsService.getPlanDetails(pageId, planId)

  if (!planDetails) {
    return NextResponse.json({ error: "Plan details not found" }, { status: 404 })
  }

  return NextResponse.json(planDetails)
}
