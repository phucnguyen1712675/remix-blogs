import { type ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { PostForm } from '~/components/Post/PostForm'
import { db } from '~/utils/db.server'
import { validatePost } from '~/utils/post.validation'
import { StatusCodes } from 'http-status-codes'
import { ErrorMessages } from '~/constants/messages'
import { Routes } from '~/utils/routes'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const validation = await validatePost(formData)

  if (validation.errors) {
    return json(
      { errors: validation.errors },
      { status: StatusCodes.BAD_REQUEST }
    )
  }
  try {
    const post = await db.post.create({
      data: validation.data,
    })

    return redirect(Routes.posts.detail(post.id))
  } catch (error) {
    return json(
      { errors: { _form: ErrorMessages.OPERATION.CREATE_FAILED } },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}

export default function NewPost() {
  const actionData = useActionData<typeof action>()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <PostForm
        errors={actionData?.errors}
        cancelTo={Routes.home}
        submitLabel="Create Post"
      />
    </div>
  )
}
