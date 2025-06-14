export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
}

export const posts = [
  {
    id: '1',
    title: 'Next.jsの始め方',
    content: '<p>Next.jsはReactベースのフレームワークで、サーバーサイドレンダリングや静的サイト生成などの機能を提供します。</p>',
    createdAt: '2024-03-20T00:00:00.000Z',
    categories: ['Next.js', 'React', 'JavaScript']
  },
  {
    id: '2',
    title: 'TypeScriptの型システム',
    content: '<p>TypeScriptはJavaScriptに静的型付けを追加した言語です。型システムにより、開発時のエラー検出やコード補完が強化されます。</p>',
    createdAt: '2024-03-19T00:00:00.000Z',
    categories: ['TypeScript', 'JavaScript']
  },
  {
    id: '3',
    title: 'CSS Modulesの活用',
    content: '<p>CSS Modulesは、コンポーネントスコープのスタイリングを実現するための技術です。クラス名の衝突を防ぎ、メンテナンス性を向上させます。</p>',
    createdAt: '2024-03-18T00:00:00.000Z',
    categories: ['CSS', 'スタイリング']
  }
]; 