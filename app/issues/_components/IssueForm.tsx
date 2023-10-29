"use client";

import { createIssue, updateIssue } from "@/app/api/client/issues";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema, updateIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

export type IssueFormData = z.infer<typeof issueSchema>;

export type UpdateIssueFormData = z.infer<typeof updateIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issue ? updateIssueSchema : issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    const result = issue
      ? await updateIssue(data, issue.id)
      : await createIssue(data);
    setSubmitting(false);
    if (result.ok) {
      router.replace("/issues");
      router.refresh();
    } else setError(result.problem);
  });

  return (
    <div className="max-w-xl">
      {!!error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage> {errors?.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        ></Controller>
        <ErrorMessage> {errors?.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : " Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
