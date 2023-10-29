import {
  IssueFormData,
  UpdateIssueFormData,
} from "@/app/issues/_components/IssueForm";
import { apiClient } from ".";

export const createIssue = async (data: IssueFormData) =>
  await apiClient.post("/api/issues", data);

export const updateIssue = async (params: UpdateIssueFormData, id: number) =>
  await apiClient.patch(`/api/issues/${id}`, params);
