// content/archives/*.md 파일을 읽어 게시글 목록·본문을 만듭니다.
// 새 글은 같은 형식의 .md 파일을 하나 추가하면 됩니다.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content/archives");

function parse(file) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i < 0) continue;
      let v = line.slice(i + 1).trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\"/g, '"');
      meta[line.slice(0, i).trim()] = v;
    }
  }
  const slug = file.replace(/\.md$/, "");
  return { slug, ...meta, body: m ? m[2] : raw };
}

// 제목 앞의 [교육] 같은 말머리를 분리
export function splitCategory(title = "") {
  const m = title.match(/^\[([^\]]+)\]\s*(.*)$/);
  return m ? { category: m[1], title: m[2] } : { category: "", title };
}

export function getPosts() {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .map((p) => ({ ...p, ...splitCategory(p.title) }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.slug.localeCompare(a.slug)));
}

export function getPost(slug) {
  const p = getPosts().find((x) => x.slug === slug);
  return p ? { ...p, html: marked.parse(p.body, { breaks: true }) } : null;
}
