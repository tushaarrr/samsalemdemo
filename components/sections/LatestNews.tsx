import { getLatestBlogPosts } from '@/lib/supabase';
import LatestNewsClient from './LatestNewsClient';

export default async function LatestNews() {
    const posts = await getLatestBlogPosts();

    if (posts.length === 0) return null;

    return <LatestNewsClient posts={posts} />;
}
