import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <div className='container'>
        <Link href='/'>
          <a>
            <h2>Blog</h2>
          </a>
        </Link>
      </div>
    </header>
  );
};
