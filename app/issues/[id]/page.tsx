import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading> {issue.title}</Heading>
      <Flex align="center" my="2" gap="3">
        <IssuesStatusBadge status={issue.status} />
        <Text> {issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card>
        <p> {issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
