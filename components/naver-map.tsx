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
  userLocation?: { lat: number; lng: number } | null;
  onMarkerClick?: (shelter: Shelter) => void;
};

const DEFAULT_CENTER = { lat: 36.35, lng: 127.78 };
const DEFAULT_ZOOM = 7;
const MARKER_WIDTH = 22;
const MARKER_HEIGHT = 30;

export function NaverMap({ shelters, activeShelterId, userLocation, onMarkerClick }: NaverMapProps) {
  const mapRootRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const markerClickRef = useRef(onMarkerClick);
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
    markerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

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
        zoom: DEFAULT_ZOOM,
        minZoom: 6,
        maxZoom: 16,
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
          content: `
            <div class="naver-marker" title="${shelter.title}">
              <span class="naver-marker-pin" style="background:${shelter.map.color}"></span>
              <strong class="naver-marker-tooltip">${shelter.title}</strong>
            </div>
          `,
          size: new naverMaps.Size(MARKER_WIDTH, MARKER_HEIGHT),
          anchor: new naverMaps.Point(MARKER_WIDTH / 2, MARKER_HEIGHT),
        },
      });

      naverMaps.Event.addListener(marker, "click", () => {
        markerClickRef.current?.(shelter);
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
      mapRef.current.setZoom(12);
    } else {
      mapRef.current.setCenter(new naverMaps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng));
      mapRef.current.setZoom(DEFAULT_ZOOM);
    }
  }, [encodedShelters, isReady]);

  useEffect(() => {
    const naverMaps = window.naver?.maps;
    if (!naverMaps || !mapRef.current) {
      return;
    }

    if (!userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      return;
    }

    const position = new naverMaps.LatLng(userLocation.lat, userLocation.lng);

    if (!userMarkerRef.current) {
      userMarkerRef.current = new naverMaps.Marker({
        position,
        map: mapRef.current,
        title: "내 위치",
        icon: {
          content: '<div class="naver-user-marker"></div>',
          size: new naverMaps.Size(22, 22),
          anchor: new naverMaps.Point(11, 11),
        },
      });
    } else {
      userMarkerRef.current.setPosition(position);
      userMarkerRef.current.setMap(mapRef.current);
    }

    if (!activeShelterId) {
      mapRef.current.panTo(position);
      mapRef.current.setZoom(10, true);
    }
  }, [activeShelterId, userLocation]);

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
