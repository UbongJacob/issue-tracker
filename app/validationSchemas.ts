import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(2).optional(),
});

export const updateIssueSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  description: z.string().min(2).optional(),
});
