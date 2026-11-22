import PageHead from "@/components/PageHead";
import { news } from "@/data/site";

export const metadata = { title: "ICHRD 여정" };

export default function Archives() {
  return (
    <>
      <PageHead eyebrow="Journey" title="ICHRD 여정" desc="포럼, 학술대회, 프로그램 소식을 전합니다." />
      <section className="section">
        <div className="container news list">
          {news.map((n) => (
            <article key={n.title} className="news-item">
              <time>{n.date}</time>
              <h3>{n.title}</h3>
              <p>{n.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
