import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { description: body.description, title: body.title },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET() {
  const allIssues = await prisma.issue.findMany();
  return NextResponse.json(allIssues, { status: 200 });
}
