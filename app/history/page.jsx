import PageHead from "@/components/PageHead";
import { history } from "@/data/site";

export const metadata = { title: "연혁" };

export default function History() {
  return (
    <>
      <PageHead
        eyebrow="Our History · Journey of Innovation"
        title="창의적 사고로 경계를 허물고, 인재 양성의 새로운 패러다임을 제시합니다"
        desc="Breaking Barriers, Building Futures — A Decade of Creative Educational Excellence"
      />
      <section className="section">
        <div className="container narrow">
          <p className="lead">창의인재개발연구소는 12년간 디자인씽킹을 중심으로 한 창의교육 혁신의 길을 걸어왔습니다. 매년 학술대회, 워크숍을 개최하며 교육 현장의 변화 사례를 발굴하고 미래교육 혁신을 선도합니다.</p>
          <ol className="timeline big">
            {history.map((h) => <li key={h.year}><b>{h.year}</b><span>{h.text}</span></li>)}
          </ol>
          <p className="lead center">12년 성장을 바탕으로, 더 큰 혁신을 향해 나아갑니다.</p>
        </div>
      </section>
    </>
  );
}
