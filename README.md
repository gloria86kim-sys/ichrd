# 창의인재개발연구소 웹사이트 (ichrd.kr)

Next.js 정적 내보내기(`output: "export"`) → GitHub Pages 배포.

## 내용 수정
- 모든 문구: `data/site.js` (새 소식은 `news` 맨 위에 추가)
- 히어로 잉크 효과: `components/InkReveal.jsx`
- 디자인: `app/globals.css`
- 이미지: `public/` 폴더에 넣고 `/파일명.jpg`로 사용

## 로컬 미리보기
```
npm install
npm run dev     # http://localhost:3000
```

## 배포
`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드해서 GitHub Pages에 올립니다.
최초 1회: 저장소 Settings → Pages → Source를 **GitHub Actions**로 선택.
도메인은 `public/CNAME`(ichrd.kr)로 연결됩니다.
