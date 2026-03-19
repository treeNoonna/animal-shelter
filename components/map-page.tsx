"use client";
import { useMemo, useState } from "react";
import { NaverMap } from "@/components/naver-map";
import { SiteHeader } from "@/components/site-header";
import { getDistanceKm, type UserLocation } from "@/lib/geo";
import { regions, shelters } from "@/lib/shelters";

function getPrimarySnsLink(sns: Record<string, string>) {
  return Object.values(sns)[0] ?? null;
}

export function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeShelterId, setActiveShelterId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [locationMessage, setLocationMessage] = useState("");

  const filteredShelters = useMemo(
    () => shelters.filter((shelter) => !selectedRegion || shelter.region === selectedRegion),
    [selectedRegion],
  );

  const nearestShelters = useMemo(() => {
    if (!userLocation) {
      return [];
    }

    return shelters
      .map((shelter) => ({
        ...shelter,
        distanceKm: getDistanceKm(userLocation, { lat: shelter.map.lat, lng: shelter.map.lng }),
      }))
      .sort((left, right) => left.distanceKm - right.distanceKm)
      .slice(0, 3);
  }, [userLocation]);

  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationMessage("이 브라우저에서는 위치 찾기를 지원하지 않습니다.");
      return;
    }

    setLocationStatus("loading");
    setLocationMessage("현재 위치를 확인하고 있습니다.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationStatus("ready");
        setLocationMessage("가장 가까운 보호소를 찾았습니다.");
      },
      () => {
        setLocationStatus("error");
        setLocationMessage("위치 권한을 허용하면 가까운 보호소를 찾을 수 있습니다.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <div className="page-shell">
      <SiteHeader active="map" />

      <main className="map-page-shell">
        <section className="map-page-heading">
          <div>
            <p className="eyebrow">Shelter Map</p>
            <h1 className="map-page-title">보호소 지도</h1>
          </div>
          <p className="section-copy map-page-copy">
            아래 지역을 선택하면 해당 지역 쉼터 목록이 나타납니다.
          </p>
        </section>

        <div className="chip-row map-chip-row">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              className={`region-chip ${(region === "전체" ? !selectedRegion : selectedRegion === region) ? "is-active" : ""}`}
              onClick={() => {
                setSelectedRegion(region === "전체" ? null : region);
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
              userLocation={userLocation}
              onMarkerClick={(shelter) => {
                setSelectedRegion(shelter.region);
                setActiveShelterId(shelter.id);
              }}
            />
          </div>

          <aside className="map-sidebar">
            {selectedRegion ? (
              <>
                <div className="map-sidebar-heading">
                  <strong>{selectedRegion}</strong>
                  <span>{filteredShelters.length} shelters</span>
                </div>
                {filteredShelters.map((shelter) => {
                  const primarySnsLink = getPrimarySnsLink(shelter.sns);

                  return (
                    <article
                      key={shelter.id}
                      className={`map-list-card ${activeShelterId === shelter.id ? "is-active" : ""}`}
                    >
                      <div
                        className="map-list-button"
                        onMouseEnter={() => setActiveShelterId(shelter.id)}
                        onFocus={() => setActiveShelterId(shelter.id)}
                      >
                        {primarySnsLink ? (
                          <a className="map-list-link" href={primarySnsLink} target="_blank" rel="noreferrer">
                            {shelter.name}
                          </a>
                        ) : (
                          <strong>{shelter.name}</strong>
                        )}
                        <span>{shelter.city}</span>
                      </div>
                    </article>
                  );
                })}
              </>
            ) : (
              <article className="map-sidebar-empty">
                <strong>지역을 선택해 주세요</strong>
                <p>지도에서 보호소 지역을 선택하면 해당 지역 쉼터 목록이 나타납니다.</p>
              </article>
            )}
          </aside>

          <section className="nearby-panel">
            <div className="nearby-panel-heading">
              <div>
                <p className="eyebrow">Nearby Shelters</p>
                <h2>내 위치 기반 가까운 보호소</h2>
              </div>
              <button type="button" className="ghost-button" onClick={handleFindNearest}>
                {locationStatus === "loading" ? "위치 확인 중..." : "가까운 보호소 찾기"}
              </button>
            </div>

            <p className={`nearby-status ${locationStatus}`}>
              {locationMessage || "버튼을 누르면 현재 위치 기준으로 가장 가까운 보호소를 찾아줍니다."}
            </p>

            {nearestShelters.length ? (
              <div className="nearby-list">
                {nearestShelters.map((shelter) => (
                  <article key={shelter.id} className="nearby-card">
                    <div className="nearby-copy">
                      <strong>{shelter.name}</strong>
                      <span>
                        {shelter.city} · 약 {shelter.distanceKm.toFixed(1)}km
                      </span>
                    </div>
                    <div className="nearby-actions">
                      <button
                        type="button"
                        className="mini-action"
                        onClick={() => {
                          setSelectedRegion(shelter.region);
                          setActiveShelterId(shelter.id);
                        }}
                      >
                        지도에서 보기
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        </section>
      </main>
    </div>
  );
}
