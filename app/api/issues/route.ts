import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
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
