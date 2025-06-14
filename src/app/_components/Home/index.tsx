"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./Home.module.css";
import { MicroCmsPost } from "../../types/MicroCmsPost";

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('https://zrntmapmln.microcms.io/api/v1/posts', {
          headers: {
            'X-MICROCMS-API-KEY': 'TKk3CoAbQDpYVj38TQmVmhcPUy7PyvSAzOgf',
          },
        });
        const { contents } = await res.json();
        setPosts(contents);
      } catch (err) {
        setError('記事の取得に失敗しました');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
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
                src={post.thumbnail.url}
                alt={post.title}
                width={post.thumbnail.width}
                height={post.thumbnail.height}
                className={classes.postThumbnail}
              />
              <div className={classes.postContainer}>
                <div className={classes.postMeta}>
                  <h2 className={classes.postTitle}>{post.title}</h2>
                  <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
                  <div className={classes.categories}>
                    {post.categories.map((category) => (
                      <span key={category.id} className={classes.category}>
                        {category.name}
                      </span>
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