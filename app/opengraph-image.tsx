import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteName } from "@/lib/site";

export const alt = `${siteName} 대표 이미지`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function imageToDataUrl(fileName: string) {
  const filePath = join(process.cwd(), "public", fileName);
  const buffer = await readFile(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [cat1, cat2, cat3] = await Promise.all([
    imageToDataUrl("cat1.png"),
    imageToDataUrl("cat2.png"),
    imageToDataUrl("cat3.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(135deg, #fffaf4 0%, #f7f2ff 46%, #eef6ff 100%)",
          color: "#111111",
          overflow: "hidden",
          fontFamily: "Trebuchet MS, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,186,214,0.45), transparent 30%), radial-gradient(circle at bottom right, rgba(141,135,188,0.22), transparent 34%)",
          }}
        />

        <div
          style={{
            width: "54%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 64px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              fontSize: 26,
              letterSpacing: 1.2,
              color: "#6d678f",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#8d87bc",
              }}
            />
            {siteName}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: -1.6,
              marginBottom: 20,
            }}
          >
            <span>전국의 민간 동물보호소를 쉽게</span>
            <span>찾고 등록해보세요.</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 500,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#5c5868",
            }}
          >
            보호소의 지역 정보, SNS, 후원 정보를 한 번에 모아보세요
          </div>
        </div>

        <div
          style={{
            width: "46%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 44,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 10,
              width: 190,
              height: 190,
              borderRadius: 999,
              background: "rgba(255,255,255,0.72)",
              boxShadow: "0 24px 60px rgba(64, 54, 87, 0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 118,
              right: 38,
              width: 180,
              height: 180,
              borderRadius: 36,
              background: "rgba(255,255,255,0.72)",
              boxShadow: "0 24px 60px rgba(64, 54, 87, 0.08)",
              transform: "rotate(-10deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 52,
              left: 52,
              width: 230,
              height: 150,
              borderRadius: 30,
              background: "rgba(255,255,255,0.82)",
              boxShadow: "0 24px 60px rgba(64, 54, 87, 0.08)",
            }}
          />
          <img
            src={cat2}
            alt=""
            style={{
              position: "absolute",
              top: 76,
              left: 0,
              width: 210,
              height: 210,
              objectFit: "contain",
            }}
          />
          <img
            src={cat1}
            alt=""
            style={{
              position: "absolute",
              right: 0,
              top: 84,
              width: 228,
              height: 228,
              objectFit: "contain",
            }}
          />
          <img
            src={cat3}
            alt=""
            style={{
              position: "absolute",
              bottom: 14,
              left: 120,
              width: 250,
              height: 250,
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
