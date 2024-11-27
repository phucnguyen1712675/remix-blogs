import { z } from 'zod'
import { ErrorMessages } from '~/constants/messages'

export const postSchema = z.object({
  title: z.string().min(1, ErrorMessages.VALIDATION.TITLE_REQUIRED),
  content: z.string().min(1, ErrorMessages.VALIDATION.CONTENT_REQUIRED),
  excerpt: z.string().optional(),
})

export type PostFormData = z.infer<typeof postSchema>

export async function validatePost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  const excerpt = formData.get('excerpt')

  const result = postSchema.safeParse({
    title,
    content,
    excerpt: excerpt || undefined,
  })

  if (!result.success) {
    const errors: Record<string, string> = {}
    result.error.issues.forEach((issue) => {
      errors[issue.path[0]] = issue.message
    })
    return { errors }
  }

  return { data: result.data }
} 