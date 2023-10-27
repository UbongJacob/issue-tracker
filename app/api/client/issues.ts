import { IssueFormData } from "@/app/issues/_components/IssueForm";
import { apiClient } from ".";

export const createIssue = async (data: IssueFormData) =>
  await apiClient.post("/api/issues", data);
