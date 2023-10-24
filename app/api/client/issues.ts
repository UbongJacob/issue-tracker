import { IssueForm } from "@/app/issues/new/page";
import { apiClient } from ".";

export const createIssue = async (data: IssueForm) =>
  await apiClient.post("/api/issues", data);
