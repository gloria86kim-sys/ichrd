import PageHead from "@/components/PageHead";
import { activities } from "@/data/site";

export const metadata = { title: "ICHRD 활동" };

export default function Activities() {
  return (
    <>
      <PageHead eyebrow="Activities" title="연구·교육·협력으로 창의적 교육 혁신과 인재육성을 선도합니다" />
      <section className="section">
        <div className="container cards2">
          {activities.map((a) => (
            <div key={a.title} className="card">
              <h3>{a.title} <small>{a.en}</small></h3>
              <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
