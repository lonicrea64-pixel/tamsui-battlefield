"use client";

export default function TaiwanMapCanvas() {
  return (
    <div
      className="taiwan-theater-map taiwan-static-chart"
      role="img"
      aria-label="1884 年臺灣戰區示意圖，僅標示滬尾戰場"
    >
      <img
        src="/images/maps/taiwan-nautical-chart.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <span className="taiwan-tamsui-marker taiwan-static-marker">
        滬尾戰場<i />
      </span>
    </div>
  );
}