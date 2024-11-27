import { Form } from "@remix-run/react";
import { Button } from "../Button";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import type { ActionErrors } from "~/utils/types";
import { ErrorMessage } from '~/components/ui/ErrorMessage'

interface PostFormProps {
  method?: "post" | "patch";
  errors?: ActionErrors;
  defaultValues?: {
    title?: string;
    content?: string;
    excerpt?: string;
  };
  cancelTo: string;
  submitLabel?: string;
}

export function PostForm({
  method = "post",
  errors,
  defaultValues = {},
  cancelTo,
  submitLabel = "Save",
}: PostFormProps) {
  return (
    <Form method={method} className="space-y-6">
      <Input
        label="Title"
        name="title"
        type="text"
        defaultValue={defaultValues.title}
        error={errors?.title}
        required
      />

      <TextArea
        label="Content"
        name="content"
        rows={10}
        defaultValue={defaultValues.content}
        error={errors?.content}
        required
      />

      <TextArea
        label="Excerpt (optional)"
        name="excerpt"
        rows={3}
        defaultValue={defaultValues.excerpt ?? ""}
        error={errors?.excerpt}
      />

      <ErrorMessage message={errors?._form} className="mb-4" />

      <div className="flex gap-4">
        <Button type="submit">{submitLabel}</Button>
        <Button as="link" to={cancelTo} variant="secondary">
          Cancel
        </Button>
      </div>
    </Form>
  );
} 