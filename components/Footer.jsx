import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div>
          <p className="footer-mark">ICHRD</p>
          <p>{site.name}</p>
          <p className="muted">{site.nameEn}</p>
        </div>
        <div>
          <p className="label">Contact</p>
          <p>{site.address} {site.name}</p>
          <p>Tel. {site.phone}</p>
          <p>파트너십 &amp; 협업 제안 <a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a href={site.university} target="_blank" rel="noreferrer">단국대학교 바로가기 ↗</a></p>
        </div>
      </div>
      <div className="container copy">© 2026 {site.name}. All rights reserved.</div>
    </footer>
  );
}
