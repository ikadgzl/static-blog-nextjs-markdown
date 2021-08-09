import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

export default function PostPage({
  slug,
  frontMatter: { title, date, cover_image },
  content
}) {
  return (
    <>
      <Link href='/'>
        <a className='btn btn-back'>Go Back</a>
      </Link>

      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <Image src={cover_image} alt={title} width={400} height={400} />

        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', `${slug}.md`),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);

  return {
    props: { slug, frontMatter, content }
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((file) => ({
    params: { slug: file.replace('.md', '') }
  }));

  return {
    paths,
    fallback: false
  };
};
