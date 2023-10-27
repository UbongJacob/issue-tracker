import { Flex, Card, Box } from "@radix-ui/themes";

import { Skeleton } from "@/app/components";

const LoadingIssueDetailPage = (): JSX.Element => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex align="center" my="2" gap="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>

      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
