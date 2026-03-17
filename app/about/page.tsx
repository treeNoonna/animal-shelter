import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <div className="page-shell">
      <SiteHeader active="about" />
      <main className="simple-page-shell">
        <section className="simple-page-hero">
          <p className="eyebrow">About</p>
          <h1 className="simple-page-title">이 홈페이지에 대해</h1>
          <p className="section-copy simple-page-copy">
            Pet Shelter Archive는 전국의 민간 동물보호소 정보를 더 쉽게 찾을 수 있게 정리한
            디렉터리입니다. 보호소별 SNS, 후원 계좌, 필요한 물품, 운영 성격을 한곳에서 볼 수
            있도록 만드는 것이 목적입니다.
          </p>
        </section>

        <section className="simple-grid">
          <article className="info-card">
            <h2>무엇을 볼 수 있나요</h2>
            <ul className="animal-list">
              <li>지역별 민간 보호소 목록</li>
              <li>보호소별 SNS 링크</li>
              <li>후원 계좌와 필요 물품</li>
              <li>지도 기반 위치 확인</li>
            </ul>
          </article>

          <article className="info-card">
            <h2>왜 만들었나요</h2>
            <p className="section-copy">
              공공 보호소 정보와 달리 민간 보호소 정보는 흩어져 있는 경우가 많습니다. 이 페이지는
              후원과 관심이 필요한 곳을 한 번에 볼 수 있는 입구 역할을 목표로 합니다.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
