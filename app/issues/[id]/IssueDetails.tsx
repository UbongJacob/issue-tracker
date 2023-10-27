import { IssuesStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }): JSX.Element => {
  return (
    <>
      <Heading> {issue.title}</Heading>
      <Flex align="center" my="2" gap="3">
        <IssuesStatusBadge status={issue.status} />
        <Text> {issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
