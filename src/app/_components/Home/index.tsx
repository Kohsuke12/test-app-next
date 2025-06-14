"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./Home.module.css";
import { Post } from '../../_data/posts';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
        if (!response.ok) {
          throw new Error('記事の取得に失敗しました');
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className={classes.mainContent}>読み込み中...</div>;
  }

  if (error) {
    return <div className={classes.mainContent}>エラー: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className={classes.mainContent}>記事がありません。</div>;
  }

  return (
    <main className={classes.mainContent}>
      <h1>記事一覧</h1>
      <div className={classes.postsContainer}>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className={classes.postLink}>
            <article className={classes.postCard}>
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                width={300}
                height={200}
                className={classes.postThumbnail}
              />
              <div className={classes.postContainer}>
                <div className={classes.postMeta}>
                  <h2 className={classes.postTitle}>{post.title}</h2>
                  <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
                  <div className={classes.categories}>
                    {post.categories.map((category: string) => (
                      <span key={category} className={classes.category}>{category}</span>
                    ))}
                  </div>
                  <div 
                    className={classes.postContent}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}; 