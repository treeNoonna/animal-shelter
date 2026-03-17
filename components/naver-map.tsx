"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { Shelter } from "@/lib/shelters";

declare global {
  interface Window {
    naver?: {
      maps: any;
    };
  }
}

type NaverMapProps = {
  shelters: Shelter[];
  activeShelterId?: string | null;
  onMarkerClick?: (shelter: Shelter) => void;
};

const DEFAULT_CENTER = { lat: 36.35, lng: 127.78 };

export function NaverMap({ shelters, activeShelterId, onMarkerClick }: NaverMapProps) {
  const mapRootRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isReady, setIsReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  const encodedShelters = useMemo(
    () =>
      shelters.map((shelter) => ({
        ...shelter,
        title: shelter.name.replace(/"/g, "&quot;"),
      })),
    [shelters],
  );

  useEffect(() => {
    if (window.naver?.maps) {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const naverMaps = window.naver?.maps;
    if (!naverMaps || !mapRootRef.current) {
      return;
    }

    if (!mapRef.current) {
      mapRef.current = new naverMaps.Map(mapRootRef.current, {
        center: new naverMaps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
        zoom: 7,
        minZoom: 6,
        maxZoom: 12,
        logoControl: false,
        mapDataControl: false,
        scaleControl: false,
      });
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = encodedShelters.map((shelter) => {
      const marker = new naverMaps.Marker({
        position: new naverMaps.LatLng(shelter.map.lat, shelter.map.lng),
        map: mapRef.current,
        title: shelter.name,
        icon: {
          content: `<div class="naver-marker" style="background:${shelter.map.color}"><span>${shelter.region}</span></div>`,
          size: new naverMaps.Size(74, 74),
          anchor: new naverMaps.Point(37, 37),
        },
      });

      naverMaps.Event.addListener(marker, "click", () => {
        onMarkerClick?.(shelter);
      });

      return marker;
    });

    if (encodedShelters.length > 1) {
      const bounds = new naverMaps.LatLngBounds();
      encodedShelters.forEach((shelter) => {
        bounds.extend(new naverMaps.LatLng(shelter.map.lat, shelter.map.lng));
      });
      mapRef.current.fitBounds(bounds, { top: 60, right: 40, bottom: 60, left: 40 });
    } else if (encodedShelters.length === 1) {
      mapRef.current.setCenter(new naverMaps.LatLng(encodedShelters[0].map.lat, encodedShelters[0].map.lng));
      mapRef.current.setZoom(10);
    } else {
      mapRef.current.setCenter(new naverMaps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng));
      mapRef.current.setZoom(7);
    }
  }, [encodedShelters, isReady, onMarkerClick]);

  useEffect(() => {
    const naverMaps = window.naver?.maps;
    if (!naverMaps || !activeShelterId || !mapRef.current) {
      return;
    }

    const activeShelter = encodedShelters.find((shelter) => shelter.id === activeShelterId);
    if (!activeShelter) {
      return;
    }

    mapRef.current.panTo(new naverMaps.LatLng(activeShelter.map.lat, activeShelter.map.lng));
  }, [activeShelterId, encodedShelters]);

  if (!clientId) {
    return (
      <div className="map-fallback">
        <strong>네이버 지도 키가 필요합니다</strong>
        <p>
          `.env.local`에 <code>NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=발급받은키</code> 를 추가하면 실제 지도가
          표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
        strategy="afterInteractive"
        onReady={() => setIsReady(true)}
      />
      <div ref={mapRootRef} className="naver-map" />
    </>
  );
}
