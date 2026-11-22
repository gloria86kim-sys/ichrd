import Link from "next/link";
import PageHead from "@/components/PageHead";
import { getPosts } from "@/lib/posts";

export const metadata = { title: "ICHRD 여정" };

export default function Archives() {
  const posts = getPosts();
  return (
    <>
      <PageHead eyebrow="Journey" title="ICHRD 여정" desc="포럼, 학술대회, 연구·협력 소식을 전합니다." />
      <section className="section">
        <div className="container post-grid">
          {posts.map((p) => (
            <Link key={p.slug} href={`/archives/${p.slug}/`} className="post-card">
              <div className="post-thumb">{p.thumb && <img src={p.thumb} alt="" loading="lazy" />}</div>
              <div className="post-meta">
                {p.category && <span className="tag">{p.category}</span>}
                <time>{p.date}</time>
              </div>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
