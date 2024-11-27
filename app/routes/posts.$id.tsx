import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Button } from '~/components/Button'
import { Typography } from '~/components/Typography'
import { formatDate } from '~/utils/datetime'
import { db } from '~/utils/db.server'
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

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button as="link" to={Routes.home} variant="secondary">
          ← Back to Posts
        </Button>
        <div className="flex gap-4">
          <Button as="link" to={Routes.posts.edit(post.id)}>
            Edit
          </Button>
          <Button as="link" to={Routes.posts.delete(post.id)} variant="danger">
            Delete
          </Button>
        </div>
      </div>

      <article className="prose dark:prose-invert lg:prose-lg max-w-none">
        <Typography variant="h1" className="mb-2">
          {post.title}
        </Typography>
        <div className="text-gray-500 dark:text-gray-400">
          {formatDate(post.createdAt)}
        </div>
        {post.excerpt && (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        )}
        <div className="mt-8 whitespace-pre-wrap">{post.content}</div>
      </article>
    </div>
  )
}
