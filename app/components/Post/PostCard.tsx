import { Typography } from '../Typography';

type PostCardProps = {
  title: string;
  excerpt: string | null;
  date: string | null;
  content: string;
};

export const PostCard = ({ title, excerpt, date, content }: PostCardProps) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="flex-1">
        <Typography variant="h3" className="mb-2">{title}</Typography>
        <Typography variant="body" className="mb-4">{excerpt}</Typography>
        <Typography variant="caption">{content}</Typography>
      </div>
      <Typography variant="caption" className="text-gray-600 mt-4">
        {date}
      </Typography>
    </article>
  );
}; 