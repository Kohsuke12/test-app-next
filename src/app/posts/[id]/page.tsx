import { PostDetail } from "../../_components/PostDetail";

interface PostDetailPageProps {
  params: { id: string };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  return <PostDetail id={params.id} />;
} 