import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './components/Post';
import { sortByDate } from '../utils/sortByDate';

export default function HomePage({ posts }) {
  return (
    <div>
      <Head>
        <title>Static Blog</title>
        <meta
          name='Static blog'
          content='Static blog with markdown using Next.js'
        />
      </Head>

      <div className='posts'>
        {posts.map((post, idx) => (
          <Post key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const posts = files.map((file) => {
    const slug = file.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');

    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug,
      frontMatter
    };
  });

  const sortedByDatePosts = posts.sort(sortByDate);

  return {
    props: {
      posts
    }
  };
};
