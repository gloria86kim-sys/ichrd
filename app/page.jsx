import Link from "next/link";
import InkReveal from "@/components/InkReveal";
import { site, stats, values, history, activities } from "@/data/site";
import { getPosts } from "@/lib/posts";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1 className="sr-only">{site.name} ICHRD</h1>
        <InkReveal text="ICHRD" />
        <div className="hero-top">
          <p>{site.nameEn}</p>
          <p className="hint">마우스를 움직여 보세요 ✦</p>
        </div>
        <div className="hero-bottom">
          <p className="hero-tag">{site.tagline}</p>
          <Link href="/about/" className="pill">자세히 알아보기 →</Link>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">About</p>
            <h2>{site.slogan}</h2>
          </div>
          <div>
            <p className="lead">{site.intro}</p>
            <p className="lead">미래를 주도하는 창의 인재를 양성하고, 변화하는 사회를 만듭니다.</p>
          </div>
        </div>
        <div className="container stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Core Values</p>
          <h2>다섯 가지 핵심가치</h2>
          <div className="values">
            {values.map((v, i) => (
              <div key={v.title} className="value">
                <span className="num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">What we do</p>
          <h2>연구·교육·협력으로 창의적 교육 혁신을 선도합니다</h2>
          <div className="cards3">
            {activities.map((a) => (
              <div key={a.title} className="card">
                <h3>{a.title} <small>{a.en}</small></h3>
                <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div>
            <p className="eyebrow">Our History</p>
            <h2>ICHRD가 걸어온 길</h2>
            <Link href="/history/" className="pill outline">연혁 전체 보기 →</Link>
          </div>
          <ol className="timeline">
            {history.slice(-4).map((h) => (
              <li key={h.year}><b>{h.year}</b><span>{h.text}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-between">
            <div>
              <p className="eyebrow">Journey</p>
              <h2>ICHRD 여정</h2>
            </div>
            <Link href="/archives/" className="pill outline">전체 보기 →</Link>
          </div>
          <div className="post-grid">
            {getPosts().slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/archives/${p.slug}/`} className="post-card">
                <div className="post-thumb">{p.thumb && <img src={p.thumb} alt="" loading="lazy" />}</div>
                <div className="post-meta">
                  {p.category && <span className="tag">{p.category}</span>}
                  <time>{p.date}</time>
                </div>
                <h3>{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>창의인재 양성을 고민하는 기관·기업·개인 연구자와의 협업을 환영합니다.</h2>
          <a className="pill light" href={`mailto:${site.email}`}>연락하기 →</a>
        </div>
      </section>
    </>
  );
}
