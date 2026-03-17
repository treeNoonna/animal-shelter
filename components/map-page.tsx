"use client";

import Link from "next/link";
import { useState } from "react";
import { NaverMap } from "@/components/naver-map";
import { SiteHeader } from "@/components/site-header";
import { regions, shelters } from "@/lib/shelters";

export function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [activeShelterId, setActiveShelterId] = useState<string | null>(null);

  const filteredShelters = shelters.filter((shelter) => {
    return selectedRegion === "전체" || shelter.region === selectedRegion;
  });

  return (
    <div className="page-shell">
      <SiteHeader active="map" />

      <main className="map-page-shell">
        <section className="map-page-heading">
          <div>
            <p className="eyebrow">Shelter Map</p>
            <h1 className="map-page-title">보호소를 지도로 살펴보기</h1>
          </div>
          <p className="section-copy map-page-copy">
            지역을 고르면 해당 권역 보호소만 네이버 지도에 표시됩니다. 마커나 아래 목록을 누르면
            연결됩니다.
          </p>
        </section>

        <div className="chip-row map-chip-row">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              className={`region-chip ${selectedRegion === region ? "is-active" : ""}`}
              onClick={() => {
                setSelectedRegion(region);
                setActiveShelterId(null);
              }}
            >
              {region}
            </button>
          ))}
        </div>

        <section className="map-page-grid">
          <div className="map-canvas-shell">
            <NaverMap
              shelters={filteredShelters}
              activeShelterId={activeShelterId}
              onMarkerClick={(shelter) => setActiveShelterId(shelter.id)}
            />
          </div>

          <aside className="map-sidebar">
            {filteredShelters.map((shelter) => (
              <article
                key={shelter.id}
                className={`map-list-card ${activeShelterId === shelter.id ? "is-active" : ""}`}
              >
                <button
                  type="button"
                  className="map-list-button"
                  onClick={() => setActiveShelterId(shelter.id)}
                >
                  <strong>{shelter.name}</strong>
                  <span>{shelter.city}</span>
                </button>
                <Link className="mini-link" href={`/shelter/${shelter.id}`}>
                  상세 페이지
                </Link>
              </article>
            ))}
          </aside>
        </section>
      </main>
    </div>
  );
}
