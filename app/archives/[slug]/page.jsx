import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  return p ? { title: p.title, description: p.summary, openGraph: { images: p.thumb ? [p.thumb] : [] } } : {};
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const prev = all[i + 1];
  const next = all[i - 1];
  return (
    <>
      <section className="page-head post-head">
        <div className="container narrow">
          <Link href="/archives/" className="back">← ICHRD 여정</Link>
          <div className="post-meta light">
            {post.category && <span className="tag">{post.category}</span>}
            <time>{post.date}</time>
          </div>
          <h1>{post.title}</h1>
        </div>
      </section>
      <article className="section">
        <div className="container narrow prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        <nav className="container narrow post-nav">
          {prev ? <Link href={`/archives/${prev.slug}/`}>← {prev.title}</Link> : <span />}
          {next ? <Link href={`/archives/${next.slug}/`}>{next.title} →</Link> : <span />}
        </nav>
      </article>
    </>
  );
}
