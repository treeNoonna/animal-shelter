"use client";

import Image from "next/image";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { regions, shelters } from "@/lib/shelters";

export function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const filteredShelters = shelters.filter((shelter) => {
    return selectedRegion === "전체" || shelter.region === selectedRegion;
  });

  return (
    <div className="page-shell">
      <SiteHeader active="shelters" />

      <main>
        <section className="catalog-layout" id="directory">
          <aside className="catalog-sidebar">
            <div className="sidebar-heading">
              <span className="slash-mark">/</span>
              <h1>
                SHELTER
                <br />
                DIRECTORY
              </h1>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-block">
              <p className="filter-label">FILTERS:</p>
              <div className="filter-stack">
                <button className="filter-row" type="button" onClick={() => setSelectedRegion("전체")}>
                  REGION
                  <span>⌄</span>
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    className={`region-filter-row ${selectedRegion === region ? "is-active" : ""}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="catalog-grid">
            {filteredShelters.length ? (
              filteredShelters.map((shelter, index) => {
                const previewImage = `/cat${(index % 3) + 1}.png`;
                const snsEntries = Object.entries(shelter.sns).slice(0, 2);

                return (
                  <article key={shelter.id} className="catalog-card">
                    <div
                      className="catalog-image"
                      style={{ background: `linear-gradient(180deg, #f8f5ff, ${shelter.map.color}14)` }}
                    >
                      <Image src={previewImage} alt={`${shelter.name} 대표 일러스트`} width={2000} height={2000} />
                    </div>
                    <div className="catalog-copy">
                      <h3>{shelter.name}</h3>
                      <p className="city">{shelter.city}</p>
                    </div>

                    <p className="description">{shelter.description}</p>

                    <div className="tag-row">
                      {shelter.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="info-block">
                      <strong>SNS</strong>
                      <div className="inline-links">
                        {snsEntries.map(([channel, url]) => (
                          <a key={channel} className="info-link small-link" href={url} target="_blank" rel="noreferrer">
                            {channel}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="info-block donation-block">
                      <strong>후원 정보</strong>
                      <p>{shelter.donation.account}</p>
                      <p>필요 물품: {shelter.donation.items.slice(0, 2).join(", ")}</p>
                    </div>
                  </article>
                );
              })
            ) : (
              <article className="empty-state airy-panel">
                <h3>조건에 맞는 보호소가 아직 없어요</h3>
                <p>다른 지역 필터를 눌러 다시 확인해보세요.</p>
              </article>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
