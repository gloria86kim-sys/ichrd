import PageHead from "@/components/PageHead";
import { greeting, directors, members } from "@/data/site";

export const metadata = { title: "사람들" };

export default function People() {
  return (
    <>
      <PageHead eyebrow="ICHRD People" title="ICHRD 사람들" desc="교육학·경영학·역사·공학 등 다양한 분야의 전문가가 함께 합니다." />
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Greeting</p>
            <h2>연구소장 인사말</h2>
            {greeting.photo && (
              <img className="greeting-photo" src={greeting.photo} alt={greeting.photoAlt} width="472" height="571" />
            )}
          </div>
          <div className="greeting">
            <p className="lead">안녕하세요, 창의인재개발연구소장 {greeting.name}입니다.</p>
            {greeting.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <p>여러분의 지속적인 관심과 참여를 부탁드립니다. 감사합니다.</p>
            <p className="sign">
              창의인재개발연구소장
              {greeting.signature ? (
                <img className="signature" src={greeting.signature} alt={`${greeting.name} 서명`} width="488" height="232" />
              ) : (
                ` ${greeting.name}`
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <p className="eyebrow">Directors</p>
          <h2>창의 인재 개발을 연구하는 사람들</h2>
          <div className="cards3">
            {directors.map((d) => (
              <div key={d.name} className="card person">
                {d.photo && (
                  <img className="avatar" src={d.photo} alt={`${d.name} 사진`} width="208" height="208" loading="lazy" />
                )}
                <span className="role">{d.role}</span>
                <h3>{d.name}</h3>
                <a href={`mailto:${d.email}`}>{d.email}</a>
                <ul>{d.lines.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            ))}
          </div>
          <h2 className="mt">연구진</h2>
          <div className="cards4">
            {members.map((m) => (
              <div key={m.name} className="card person sm">
                {m.photo && (
                  <img className="avatar" src={m.photo} alt={`${m.name} 사진`} width="160" height="160" loading="lazy" />
                )}
                <span className="role">{m.area}</span>
                <h3>{m.name}</h3>
                <p>{m.org}</p>
                <p className="muted">{m.degree}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
