import { updateIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let body;
  try {
    // GET THE BODY OBJECT AND VALIDATE IF IT IS A VALID JSON
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
  // validate the body with zod
  const validation = updateIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // GET THE ID  AND VERIFY IF IT IS A NUMBER
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json(
      { error: "issue id must be a valid number" },
      { status: 400 }
    );

  // FIND THE ISSE AND VERIFY IF IT EXISTS
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // UPDATE THE ISSUE AND RETURN TO THE CLIENT
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
