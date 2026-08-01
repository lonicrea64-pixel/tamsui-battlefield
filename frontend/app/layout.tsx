import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "淡水古戰場｜1884 滬尾之役互動地圖",
  description: "以真實座標、官方行政界與史料考證重建 1884 年清法戰爭滬尾之役。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
