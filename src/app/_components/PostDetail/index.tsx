"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PostDetail.module.css";
import { MicroCmsPost } from "../../types/MicroCmsPost";

export const PostDetail: React.FC<{ id: string }> = ({ id }) => {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`https://zrntmapmln.microcms.io/api/v1/posts/${id}`, {
          headers: {
            'X-MICROCMS-API-KEY': 'TKk3CoAbQDpYVj38TQmVmhcPUy7PyvSAzOgf',
          },
        });
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError('記事の取得に失敗しました');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, [id]);

  if (loading) {
    return <div className={styles.container}>読み込み中...</div>;
  }

  if (error) {
    return <div className={styles.container}>エラー: {error}</div>;
  }

  if (!post) {
    return <div className={styles.container}>記事が見つかりませんでした。</div>;
  }

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
        <div className={styles.categories}>
          {post.categories.map((category) => (
            <span key={category.id} className={styles.category}>
              {category.name}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.thumbnail}>
        <Image
          src={post.thumbnail.url}
          alt={post.title}
          width={post.thumbnail.width}
          height={post.thumbnail.height}
          className={styles.image}
        />
      </div>
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}; 