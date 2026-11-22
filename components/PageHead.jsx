export default function PageHead({ eyebrow, title, desc }) {
  return (
    <section className="page-head">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {desc && <p className="lead">{desc}</p>}
      </div>
    </section>
  );
}
