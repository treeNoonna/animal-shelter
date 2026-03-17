import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { shelters } from "@/lib/shelters";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return shelters.map((shelter) => ({ id: shelter.id }));
}

export default async function ShelterDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const shelter = shelters.find((item) => item.id === id);

  if (!shelter) {
    notFound();
  }

  const snsLinks = Object.entries(shelter.sns);

  return (
    <div className="page-shell detail-shell">
      <SiteHeader active="shelters" />
      <header className="detail-header">
        <Link className="ghost-button" href="/">
          목록으로 돌아가기
        </Link>
      </header>

      <main>
        <section className="detail-hero clay-card">
          <div className="detail-copy">
            <p className="eyebrow">{shelter.region} 민간 보호소</p>
            <h1>{shelter.name}</h1>
            <p className="detail-description">{shelter.description}</p>
            <div className="detail-meta">
              <span>{shelter.city}</span>
              <span>{shelter.hours}</span>
              <span>{shelter.type}</span>
            </div>
          </div>
          <div
            className="detail-bubble"
            style={{ ["--bubble-color" as string]: shelter.map.color } as CSSProperties}
          >
            <span>{shelter.region}</span>
          </div>
        </section>

        <section className="detail-grid">
          <article className="clay-card info-card">
            <p className="eyebrow">SNS</p>
            <h2>보호소 소식 보기</h2>
            <div className="link-group">
              {snsLinks.map(([channel, url]) => (
                <a key={channel} className="info-link" href={url} target="_blank" rel="noreferrer">
                  {channel}
                </a>
              ))}
            </div>
          </article>

          <article className="clay-card info-card">
            <p className="eyebrow">Donation</p>
            <h2>후원 정보</h2>
            <p className="account">{shelter.donation.account}</p>
            <a
              className="cta-button inline-button"
              href={shelter.donation.link}
              target="_blank"
              rel="noreferrer"
            >
              후원 링크 열기
            </a>
            <div className="supply-box">
              <strong>필요 물품</strong>
              <ul>
                {shelter.donation.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="clay-card info-card">
            <p className="eyebrow">Animals</p>
            <h2>보호 중인 친구들</h2>
            <ul className="animal-list">
              {shelter.animals.map((animal) => (
                <li key={animal}>{animal}</li>
              ))}
            </ul>
          </article>

          <article className="clay-card info-card">
            <p className="eyebrow">Visit</p>
            <h2>방문 안내</h2>
            <dl className="visit-list">
              <div>
                <dt>주소</dt>
                <dd>{shelter.address}</dd>
              </div>
              <div>
                <dt>운영시간</dt>
                <dd>{shelter.hours}</dd>
              </div>
              <div>
                <dt>주요 태그</dt>
                <dd>{shelter.tags.join(", ")}</dd>
              </div>
            </dl>
          </article>
        </section>
      </main>
    </div>
  );
}
