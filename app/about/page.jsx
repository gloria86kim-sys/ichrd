import PageHead from "@/components/PageHead";
import { site, stats, values } from "@/data/site";

export const metadata = { title: "ICHRD 이야기" };

export default function About() {
  return (
    <>
      <PageHead eyebrow="About ICHRD" title="창의인재개발연구소를 소개합니다" desc={site.nameEn} />
      <section className="section">
        <div className="container split">
          <h2>{site.slogan}</h2>
          <div>
            <p className="lead">{site.intro}</p>
            <p className="lead">교육·연구·협력으로 창의적인 미래 인재를 양성합니다.</p>
          </div>
        </div>
        <div className="container stats">
          {stats.map((s) => (
            <div key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span><p>{s.desc}</p></div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Core Values</p>
          <h2>창의인재개발연구소가 집중하는 핵심가치</h2>
          <div className="values">
            {values.map((v, i) => (
              <div key={v.title} className="value"><span className="num">0{i + 1}</span><h3>{v.title}</h3><p>{v.desc}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
