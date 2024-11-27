import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { PostForm } from '~/components/Post/PostForm'
import { db } from '~/utils/db.server'
import { validatePost } from '~/utils/post.validation'
import { StatusCodes } from 'http-status-codes'
import { ErrorMessages } from '~/constants/messages'
import { Routes } from '~/utils/routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await db.post.findUnique({
    where: { id: params.id },
  })

  if (!post) {
    throw new Response(ErrorMessages.OPERATION.NOT_FOUND, {
      status: StatusCodes.NOT_FOUND,
    })
  }

  return json({ post })
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const validation = await validatePost(formData)

  if (validation.errors) {
    return json(
      { errors: validation.errors },
      { status: StatusCodes.BAD_REQUEST }
    )
  }

  try {
    const post = await db.post.update({
      where: { id: params.id },
      data: validation.data,
    })

    return redirect(Routes.posts.detail(post.id))
  } catch (error) {
    return json(
      { errors: { _form: ErrorMessages.OPERATION.UPDATE_FAILED } },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}

export default function EditPost() {
  const { post } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const defaultValues = {
    title: post.title,
    content: post.content,
    excerpt: post.excerpt ?? undefined,
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

      <PostForm
        defaultValues={defaultValues}
        errors={actionData?.errors}
        cancelTo={Routes.posts.detail(post.id)}
      />
    </div>
  )
}
