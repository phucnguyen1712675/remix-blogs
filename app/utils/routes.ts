export const Routes = {
  home: '/',
  posts: {
    new: '/posts/new',
    detail: (id: string) => `/posts/${id}`,
    edit: (id: string) => `/posts/${id}/edit`,
    delete: (id: string) => `/posts/${id}/delete`,
  },
} as const 