import Link from 'next/link';
import Image from 'next/image';

export const Post = ({ post }) => {
  return (
    <div className='card'>
      <Image
        src={post.frontMatter.cover_image}
        alt={post.frontMatter.title}
        width={324}
        height={256}
      />

      <div className='post-date'>Posted on {post.frontMatter.date}</div>

      <h3>{post.frontMatter.title}</h3>
      <p>{post.frontMatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a className='btn'>Read More</a>
      </Link>
    </div>
  );
};
