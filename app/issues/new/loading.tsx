import { Box } from "@radix-ui/themes";

import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = (): JSX.Element => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2.5rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
