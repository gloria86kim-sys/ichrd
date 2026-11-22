import PageHead from "@/components/PageHead";
import gallery from "@/content/gallery.json";
import activities from "@/content/activities.json";

export const metadata = { title: "갤러리" };

export default function Gallery() {
  // 갤러리 + 활동 페이지 사진을 함께 보여줍니다 (사진은 public/images 폴더)
  const images = [...new Set([...gallery.images, ...activities.images])];
  return (
    <>
      <PageHead eyebrow="Gallery" title="ICHRD 갤러리" desc="창의인재개발연구소의 생생한 교육 현장을 만나보세요." />
      <section className="section">
        <div className="container masonry">
          {images.map((src) => (
            <a key={src} href={src} target="_blank" rel="noreferrer">
              <img src={src} alt="창의인재개발연구소 활동 사진" loading="lazy" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
