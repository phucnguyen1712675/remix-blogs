import { type ActionFunctionArgs, type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { db } from "~/utils/db.server";
import { StatusCodes } from 'http-status-codes'
import { ErrorMessages } from '~/constants/messages'
import { Routes } from '~/utils/routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await db.post.findUnique({
    where: { id: params.id },
    select: { id: true, title: true },
  });

  if (!post) {
    throw new Response(ErrorMessages.OPERATION.NOT_FOUND, { status: StatusCodes.NOT_FOUND });
  }

  return json({ post });
}

export async function action({ params }: ActionFunctionArgs) {
  try {
    await db.post.delete({
      where: { id: params.id },
    });

    return redirect(Routes.home)
  } catch (error) {
    return json(
      { error: ErrorMessages.OPERATION.DELETE_FAILED },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export default function DeletePost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Delete Post</h1>
        <p className="mb-6">
          Are you sure you want to delete &quot;{post.title}&quot;? This action cannot be
          undone.
        </p>
        <Form method="post" className="flex gap-4">
          <Button type="submit" variant="danger">
            Delete
          </Button>
          <Button as="link" to={Routes.posts.detail(post.id)} variant="secondary">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
}