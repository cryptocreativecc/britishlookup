import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BritishLookup — Free UK Business Directory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "white",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: 800,
              color: "#1D9E75",
            }}
          >
            BL
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            BritishLookup
          </span>
        </div>
        <span
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.9)",
            fontWeight: 500,
          }}
        >
          Free UK Business Directory
        </span>
        <span
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            marginTop: "12px",
          }}
        >
          Find &amp; list businesses across every industry and region
        </span>
      </div>
    ),
    { ...size }
  );
}
