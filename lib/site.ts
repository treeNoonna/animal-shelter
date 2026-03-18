export const siteName = "Pet Shelter Archive";
export const siteDescription = "전국 민간 동물보호시설을 지역별로 탐색하고 SNS와 후원 정보를 확인하는 서비스";

export const siteKeywords = [
  "민간보호소",
  "동물보호소",
  "유기동물",
  "보호소 지도",
  "동물 후원",
  "동물 구조",
  "Pet Shelter Archive",
];

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  );
}
