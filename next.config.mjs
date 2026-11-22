/** GitHub Pages용 정적 내보내기 설정 */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};
export default nextConfig;
