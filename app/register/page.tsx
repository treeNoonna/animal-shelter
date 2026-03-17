import { RegisterForm } from "@/components/register-form";
import { SiteHeader } from "@/components/site-header";

export default function RegisterPage() {
  return (
    <div className="page-shell">
      <SiteHeader active="register" />
      <main className="simple-page-shell">
        <section className="simple-page-hero">
          <p className="eyebrow">Register Shelter</p>
          <h1 className="simple-page-title">보호소 등록 안내</h1>
          <p className="section-copy simple-page-copy">
            민간 동물보호소를 이 아카이브에 등록하고 싶다면 아래 폼을 작성해 주세요. 작성 내용은
            관리자 이메일로 전달됩니다.
          </p>
        </section>

        <section className="simple-grid">
          <article className="info-card form-card">
            <h2>등록 요청 폼</h2>
            <RegisterForm />
          </article>

          <article className="info-card">
            <h2>필요한 정보</h2>
            <ul className="animal-list">
              <li>보호소 이름과 지역</li>
              <li>운영 시간과 주소</li>
              <li>인스타그램, 블로그, 유튜브 등 SNS 링크</li>
              <li>후원 계좌 또는 후원 페이지 링크</li>
              <li>현재 필요한 물품 목록</li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
