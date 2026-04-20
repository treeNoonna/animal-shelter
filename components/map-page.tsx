"use client";
import { useMemo, useState } from "react";
import { NaverMap } from "@/components/naver-map";
import { SiteHeader } from "@/components/site-header";
import { getDistanceKm, type UserLocation } from "@/lib/geo";
import { shelters } from "@/lib/shelters";

function getPrimarySnsLink(sns: Record<string, string>) {
  return Object.values(sns)[0] ?? null;
}

export function MapPage() {
  const [activeShelterId, setActiveShelterId] = useState<string | null>(null);
  const [visibleShelterIds, setVisibleShelterIds] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [locationMessage, setLocationMessage] = useState("");

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

  const visibleShelters = useMemo(() => {
    if (!visibleShelterIds.length) {
      return [];
    }
    const visibleSet = new Set(visibleShelterIds);
    return shelters.filter((shelter) => visibleSet.has(shelter.id));
  }, [visibleShelterIds]);

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
            정확한 주소가 제공되지 않은 보호소는 지도에 표시되지 않을 수 있으므로
            sns로 개별 문의 부탁드립니다.
          </p>
        </section>

        <section className="map-page-grid">
          <div className="map-canvas-shell">
            <NaverMap
              shelters={shelters}
              activeShelterId={activeShelterId}
              userLocation={userLocation}
              onVisibleShelterIdsChange={setVisibleShelterIds}
              onMarkerClick={(shelter) => {
                setActiveShelterId(shelter.id);
              }}
            />
          </div>

          <aside className="map-sidebar">
            <div className="map-sidebar-heading">
              <strong>현재 지도 내 보호소</strong>
              <span>{visibleShelters.length} shelters</span>
            </div>
            {visibleShelters.length ? (
              visibleShelters.map((shelter) => {
                const primarySnsLink = getPrimarySnsLink(shelter.sns);

                return (
                  <article
                    key={shelter.id}
                    className={`map-list-card ${activeShelterId === shelter.id ? "is-active" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveShelterId(shelter.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveShelterId(shelter.id);
                      }
                    }}
                  >
                    <div className="map-list-button">
                      {primarySnsLink ? (
                        <a
                          className="map-list-link"
                          href={primarySnsLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {shelter.name}
                        </a>
                      ) : (
                        <strong>{shelter.name}</strong>
                      )}
                      <span>{shelter.city}</span>
                    </div>
                  </article>
                );
              })
            ) : (
              <article className="map-sidebar-empty">
                <strong>현재 지도 영역에 표시된 보호소가 없습니다</strong>
                <p>지도를 이동하거나 줌아웃하면 더 많은 보호소를 볼 수 있습니다.</p>
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
