import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { Button } from '~/components/Button'
import { PostCard } from '~/components/Post/PostCard'
import { formatDate } from '~/utils/datetime'
import { Routes } from '~/utils/routes'

export async function loader() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      createdAt: true,
    },
  })

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button as="link" to={Routes.posts.new}>
          New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            No posts yet
          </div>
          <Button as="link" to={Routes.posts.new}>
            Create your first post
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} to={Routes.posts.detail(post.id)}>
              <PostCard
                title={post.title}
                excerpt={post.excerpt}
                date={formatDate(post.createdAt)}
                content={post.content}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
