"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from './PostDetail.module.css';
import { Post } from '../../data/posts';

interface PostDetailProps {
  id: string;
}

export const PostDetail: React.FC<PostDetailProps> = ({ id }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        if (!response.ok) {
          throw new Error('記事の取得に失敗しました');
        }
        const data = await response.json();
        setPost(data.post || null);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className={classes.container}>読み込み中...</div>;
  }

  if (error) {
    return <div className={classes.container}>エラー: {error}</div>;
  }

  if (!post) {
    return <div className={classes.container}>記事が見つかりませんでした。</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{post.title}</h1>
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        width={800}
        height={400}
        className={classes.thumbnail}
      />
      <div className={classes.metadata}>
        <time className={classes.date}>
          {new Date(post.createdAt).toLocaleDateString('ja-JP')}
        </time>
        <div className={classes.categories}>
          {(post.categories || []).map((category: string) => (
            <span key={category} className={classes.category}>{category}</span>
          ))}
        </div>
      </div>
      <div 
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}; 