import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }): JSX.Element => {
  return (
    <Button color="red">
      <TrashIcon />
      <span>Delete Issue</span>
    </Button>
  );
};

export default DeleteIssueButton;
