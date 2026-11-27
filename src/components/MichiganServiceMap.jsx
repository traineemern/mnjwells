import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../motion/reveal.js";

/* [UPDATED] Google-Maps-inspired Lower Peninsula terrain + pure JS cubic-Bezier truck motion (no filter clipping, no pink road overlay) */

const LP_PATH =
  "M 721 268 C 731 267, 733 277, 750 285 C 767 293, 802 308, 821 318 C 840 328, 856 339, 862 347 C 868 355, 854 357, 855 368 C 856 379, 869 397, 868 412 C 868 427, 856 446, 852 460 C 848 474, 849 480, 842 495 C 835 510, 806 547, 808 552 C 811 557, 842 535, 857 525 C 872 516, 884 497, 896 495 C 908 493, 923 499, 931 512 C 939 525, 940 554, 944 574 C 949 595, 958 618, 958 635 C 958 653, 952 669, 944 679 C 936 690, 920 691, 911 698 C 903 705, 898 713, 893 721 C 888 729, 887 735, 880 748 C 873 761, 880 790, 852 799 L 516 798 C 492 789, 534 765, 542 750 C 550 735, 558 721, 562 705 C 567 689, 570 670, 569 653 C 568 636, 561 621, 556 603 C 551 586, 540 564, 538 548 C 536 532, 542 521, 545 507 C 548 493, 554 481, 557 465 C 561 449, 560 427, 566 412 C 572 397, 581 388, 593 377 C 605 366, 630 343, 636 347 C 642 351, 628 396, 630 399 C 632 402, 643 377, 650 364 C 657 351, 664 334, 671 321 C 678 309, 683 298, 691 289 C 699 280, 711 269, 721 268 Z";

/* Main open highway cubic segments (Big Rapids -> Newaygo -> Cedar Springs -> Rockford -> Byron) */
const MAIN_SEGMENTS = [
  [[735, 395], [708, 438], [696, 478], [710, 522]],
  [[710, 522], [724, 562], [756, 565], [765, 595]],
  [[765, 595], [774, 626], [762, 652], [745, 680]],
  [[745, 680], [724, 714], [695, 734], [665, 745]],
];

const MAIN_ROUTE_PATH =
  "M 735 395 " +
  MAIN_SEGMENTS.map(([, c1, c2, p]) => `C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p[0]} ${p[1]}`).join(" ");

const BRANCH_PATHS = [
  "M 585 455 C 588 492, 602 516, 620 528 C 646 544, 682 536, 710 522",
  "M 648 608 C 682 620, 722 648, 745 680",
  "M 765 595 C 804 596, 840 618, 865 650",
];

const ALL_ROADS = [MAIN_ROUTE_PATH, ...BRANCH_PATHS];

/* Subtle Google-Maps-style secondary regional arterial roads */
const SECONDARY_ROADS = [
  "M 548 532 C 625 530, 730 518, 926 542",
  "M 650 356 C 692 385, 780 398, 858 386",
  "M 564 662 C 640 676, 770 672, 948 654",
  "M 745 680 C 766 725, 795 765, 816 798",
  "M 735 395 C 742 350, 735 310, 722 272",
];

/* Subtle warm-stone rivers and inland lakes (Google Maps terrain feel without blue) */
const WATER_RIVERS = [
  "M 556 544 C 605 538, 655 530, 710 522 C 752 514, 790 488, 825 462",
  "M 562 668 C 618 672, 680 688, 745 680 C 792 674, 832 665, 870 656",
];

const INLAND_LAKES = [
  { cx: 742, cy: 362, rx: 14, ry: 8, rot: -15 },
  { cx: 760, cy: 378, rx: 10, ry: 6, rot: 22 },
  { cx: 616, cy: 492, rx: 8, ry: 4.5, rot: -8 },
  { cx: 882, cy: 608, rx: 9, ry: 5, rot: 30 },
];

const LOCATIONS = [
  { name: "Big Rapids", x: 735, y: 395, labelX: 735, labelY: 348, anchor: "middle" },
  { name: "Hesperia", x: 585, y: 455, labelX: 562, labelY: 450, anchor: "end" },
  { name: "Fremont", x: 620, y: 528, labelX: 597, labelY: 524, anchor: "end" },
  { name: "Newaygo", x: 710, y: 522, labelX: 732, labelY: 504, anchor: "start" },
  { name: "Grant", x: 648, y: 608, labelX: 625, labelY: 604, anchor: "end" },
  { name: "Cedar Springs", x: 765, y: 595, labelX: 780, labelY: 562, anchor: "start" },
  { name: "Greenville", x: 865, y: 650, labelX: 886, labelY: 646, anchor: "start" },
  { name: "Rockford", x: 745, y: 680, labelX: 767, labelY: 690, anchor: "start" },
  { name: "Byron", x: 665, y: 745, labelX: 642, labelY: 741, anchor: "end" },
];

const GREEN_PATCHES = [
  { cx: 795, cy: 416, rx: 56, ry: 46 },
  { cx: 896, cy: 552, rx: 40, ry: 34 },
  { cx: 592, cy: 398, rx: 30, ry: 22 },
  { cx: 816, cy: 754, rx: 56, ry: 30 },
  { cx: 584, cy: 714, rx: 32, ry: 44 },
];

const TREES = [
  { x: 678, y: 318, type: "pine", scale: 0.9 },
  { x: 780, y: 374, type: "pine", scale: 1.05 },
  { x: 804, y: 394, type: "round", scale: 0.95 },
  { x: 822, y: 422, type: "pine", scale: 1.1 },
  { x: 784, y: 438, type: "pine", scale: 0.85 },
  { x: 815, y: 458, type: "round", scale: 0.9 },
  { x: 584, y: 404, type: "pine", scale: 0.95 },
  { x: 610, y: 388, type: "round", scale: 0.85 },
  { x: 898, y: 534, type: "pine", scale: 0.95 },
  { x: 916, y: 560, type: "round", scale: 1.0 },
  { x: 880, y: 574, type: "pine", scale: 0.85 },
  { x: 580, y: 696, type: "round", scale: 0.9 },
  { x: 572, y: 734, type: "pine", scale: 0.95 },
  { x: 806, y: 742, type: "pine", scale: 1.05 },
  { x: 834, y: 760, type: "round", scale: 0.95 },
  { x: 778, y: 764, type: "round", scale: 0.85 },
];

const COUNTY_X = [535, 585, 635, 685, 735, 785, 835, 885, 930];
const COUNTY_Y = [275, 330, 385, 440, 495, 550, 605, 660, 715, 765];

/* Pre-sample cubic Bezier highway in pure JS for rock-solid constant-speed animation */
function cubicAt(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const x = mt * mt * mt * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t * t * t * p3[0];
  const y = mt * mt * mt * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t * t * t * p3[1];
  const dx = 3 * mt * mt * (p1[0] - p0[0]) + 6 * mt * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * mt * mt * (p1[1] - p0[1]) + 6 * mt * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const ROUTE_SAMPLES = (() => {
  const raw = [];
  const stepsPerSeg = 60;
  for (const [p0, p1, p2, p3] of MAIN_SEGMENTS) {
    for (let i = 0; i < stepsPerSeg; i++) {
      raw.push(cubicAt(p0, p1, p2, p3, i / stepsPerSeg));
    }
  }
  const last = MAIN_SEGMENTS[MAIN_SEGMENTS.length - 1];
  raw.push(cubicAt(last[0], last[1], last[2], last[3], 1));

  let total = 0;
  const cum = [0];
  for (let i = 1; i < raw.length; i++) {
    total += Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y);
    cum.push(total);
  }
  return { raw, cum, total };
})();

function sampleRoute(progress01) {
  const { raw, cum, total } = ROUTE_SAMPLES;
  const target = Math.max(0, Math.min(1, progress01)) * total;
  let lo = 0;
  let hi = cum.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] <= target) lo = mid;
    else hi = mid;
  }
  const span = cum[hi] - cum[lo] || 1;
  const f = (target - cum[lo]) / span;
  const a = raw[lo];
  const b = raw[hi];
  // Interpolate shortest angle wrap
  let da = b.angle - a.angle;
  if (da > 180) da -= 360;
  if (da < -180) da += 360;
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    angle: a.angle + da * f,
  };
}

const townId = (town) => `town-${town.toLowerCase().replace(/\s+/g, "-")}`;

export default function MichiganServiceMap({ compact = false }) {
  const truckRef = useRef(null);
  const stageRef = useRef(null);

  /* Animate pins once on scroll enter */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") {
      stage?.classList.add("is-in-view");
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          stage.classList.add("is-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const truck = truckRef.current;
    if (!truck) return undefined;

    const applyPose = (t) => {
      const { x, y, angle } = sampleRoute(t);
      const fade = t < 0.07 ? t / 0.07 : t > 0.93 ? (1 - t) / 0.07 : 1;
      truck.setAttribute(
        "transform",
        `translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${angle.toFixed(2)}) scale(1.35)`
      );
      truck.setAttribute("opacity", Math.max(0.15, fade).toFixed(3));
    };

    let t = 0.36;
    applyPose(t);

    if (prefersReducedMotion()) {
      return undefined;
    }

    let rafId = 0;
    let lastTime = 0;
    const cycleSeconds = 7.5;

    const tick = (now) => {
      if (!lastTime) lastTime = now;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (!document.hidden) {
        t = (t + dt / cycleSeconds) % 1;
        applyPose(t);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={stageRef} className="michigan-map-stage">
      <div className={compact ? "michigan-map-layout" : "page-wrap michigan-map-layout"}>
        {!compact ? (
          <div className="michigan-map-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> West Michigan coverage
            </span>
            <h2>
              M &amp; J services<br />
              <em>are available</em><br />
              in Michigan.
            </h2>
          </div>
        ) : null}

        <div className="michigan-map-visual">
          <svg
            className="michigan-map-svg"
            viewBox="435 245 585 585"
            role="img"
            aria-label="Service-area map of Michigan Lower Peninsula showing Cedar Springs, Byron, Rockford, Greenville, Newaygo, Fremont, Grant, Hesperia, and Big Rapids"
          >
            <defs>
              <clipPath id="mi-land-clip">
                <path d={LP_PATH} />
              </clipPath>
              <filter id="mi-map-shadow" x="-10%" y="-10%" width="122%" height="124%">
                <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#171717" floodOpacity="0.1" />
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#171717" floodOpacity="0.06" />
              </filter>
            </defs>

            {/* Subtle 3D extruded edge beneath Lower Peninsula */}
            <g transform="translate(0, 6)" opacity="0.9">
              <path d={LP_PATH} fill="#E4DFD7" />
            </g>

            {/* Elevated warm-white Michigan Lower Peninsula */}
            <g filter="url(#mi-map-shadow)">
              <path d={LP_PATH} fill="#FFFFFF" />
            </g>

            {/* Google-Maps-style terrain interior: parks, rivers, lakes, secondary roads & county grid */}
            <g clipPath="url(#mi-land-clip)">
              {/* Soft sage parks & forests */}
              {GREEN_PATCHES.map((gp, i) => (
                <ellipse
                  key={`gp-${i}`}
                  cx={gp.cx}
                  cy={gp.cy}
                  rx={gp.rx}
                  ry={gp.ry}
                  fill="#E4ECDC"
                  opacity="0.85"
                />
              ))}

              {/* Subtle county boundary grid */}
              <g stroke="#F1EFEA" strokeWidth="1.1" fill="none">
                {COUNTY_X.map((x) => (
                  <line key={`cx-${x}`} x1={x} y1="250" x2={x} y2="810" />
                ))}
                {COUNTY_Y.map((y) => (
                  <line key={`cy-${y}`} x1="490" y1={y} x2="980" y2={y} />
                ))}
              </g>

              {/* Warm stone-tinted rivers & inland lakes */}
              <g stroke="#E9E4DB" strokeWidth="3.2" strokeLinecap="round" fill="none">
                {WATER_RIVERS.map((d, i) => (
                  <path key={`river-${i}`} d={d} />
                ))}
              </g>
              {INLAND_LAKES.map((lk, i) => (
                <ellipse
                  key={`lake-${i}`}
                  cx={lk.cx}
                  cy={lk.cy}
                  rx={lk.rx}
                  ry={lk.ry}
                  transform={`rotate(${lk.rot} ${lk.cx} ${lk.cy})`}
                  fill="#E9E4DB"
                />
              ))}

              {/* Subtle Google-Maps-style secondary regional roads */}
              <g stroke="#E6E2DA" strokeWidth="3.4" strokeLinecap="round" fill="none">
                {SECONDARY_ROADS.map((d, i) => (
                  <path key={`sec-${i}`} d={d} />
                ))}
              </g>
              <g stroke="#F8F7F4" strokeWidth="1.6" strokeLinecap="round" fill="none">
                {SECONDARY_ROADS.map((d, i) => (
                  <path key={`sec-in-${i}`} d={d} />
                ))}
              </g>

              {/* Stylized pine & rounded sage trees */}
              {TREES.map((tree, i) => (
                <g key={`tree-${i}`} transform={`translate(${tree.x}, ${tree.y}) scale(${tree.scale})`}>
                  <ellipse cx="0" cy="3" rx="6" ry="2.2" fill="#171717" opacity="0.1" />
                  <rect x="-1.2" y="-3" width="2.4" height="5" rx="0.8" fill="#76604E" />
                  {tree.type === "pine" ? (
                    <>
                      <polygon points="0,-20 -7,-7 7,-7" fill="#5B7052" />
                      <polygon points="0,-15 -8.5,-3 8.5,-3" fill="#4B5F43" />
                      <polygon points="0,-20 0,-3 8.5,-3" fill="#41533A" opacity="0.35" />
                    </>
                  ) : (
                    <>
                      <circle cx="0" cy="-10" r="7.2" fill="#738A68" />
                      <circle cx="-2" cy="-12" r="4.5" fill="#89A07D" />
                    </>
                  )}
                </g>
              ))}
            </g>

            {/* Outer coastline border */}
            <path d={LP_PATH} fill="none" stroke="#E6E1D8" strokeWidth="1.3" />

            {/* Black highway network with shoulder & crisp white dashed strips */}
            <g className="mi-road-network" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {ALL_ROADS.map((d, i) => (
                <path key={`shoulder-${i}`} d={d} stroke="#DDD7CD" strokeWidth="14" />
              ))}
              {ALL_ROADS.map((d, i) => (
                <path key={`asphalt-${i}`} d={d} stroke="#171717" strokeWidth="10.5" />
              ))}
              {ALL_ROADS.map((d, i) => (
                <path
                  key={`strip-${i}`}
                  d={d}
                  stroke="#FFFFFF"
                  strokeWidth="1.7"
                  strokeDasharray="6 7"
                />
              ))}
            </g>

            {/* 9 red pulsing location pins & crisp haloed Google-Maps-style labels */}
            {LOCATIONS.map((loc, idx) => (
              <g
                key={loc.name}
                id={townId(loc.name)}
                className="mi-pin-group"
                style={{ "--pin-delay": `${idx * 0.25}s` }}
              >
                <circle
                  className="mi-pin-pulse"
                  cx={loc.x}
                  cy={loc.y}
                  r="11"
                  fill="#F4B7B0"
                />
                <circle cx={loc.x} cy={loc.y} r="3.5" fill="#171717" opacity="0.2" />
                <g transform={`translate(${loc.x}, ${loc.y})`}>
                  <path
                    d="M 0 0 C -5.5 -6.5 -9 -11.5 -9 -16 C -9 -21 -5 -25 0 -25 C 5 -25 9 -21 9 -16 C 9 -11.5 5.5 -6.5 0 0 Z"
                    fill="#D92323"
                    stroke="#FFFFFF"
                    strokeWidth="1.3"
                  />
                  <circle cx="0" cy="-16" r="3.2" fill="#FFFFFF" />
                </g>
                <text
                  x={loc.labelX}
                  y={loc.labelY}
                  textAnchor={loc.anchor}
                  className="mi-pin-label"
                >
                  <tspan x={loc.labelX} dy="0">{loc.name},</tspan>
                  <tspan x={loc.labelX} dy="15">Michigan</tspan>
                </text>
              </g>
            ))}

            {/* Moving 3D-perspective red & white semi-truck + soft red trailing streaks (no SVG filter clipping) */}
            <g
              ref={truckRef}
              transform="translate(722, 548) rotate(72) scale(1.35)"
              className="mi-truck"
            >
              {/* Soft red motion trail right behind the truck */}
              <line x1="-54" y1="0" x2="-27" y2="0" stroke="#F4B7B0" strokeWidth="4.2" strokeLinecap="round" opacity="0.85" />
              <line x1="-46" y1="-4" x2="-27" y2="-4" stroke="#F4B7B0" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
              <line x1="-44" y1="4" x2="-27" y2="4" stroke="#F4B7B0" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
              {/* Soft ground shadow */}
              <ellipse cx="-3" cy="3.5" rx="23" ry="8" fill="#171717" opacity="0.24" />
              {/* White trailer */}
              <rect x="-24" y="-7.5" width="24" height="14" rx="1.8" fill="#FFFFFF" stroke="#D5D0C7" strokeWidth="0.9" />
              <rect x="-24" y="2.5" width="24" height="4" rx="0.8" fill="#EBE7E0" />
              <line x1="-24" y1="-4.5" x2="0" y2="-4.5" stroke="#F4B7B0" strokeWidth="1" />
              {/* Hitch */}
              <rect x="-1" y="-2.5" width="4" height="5" fill="#3A3A38" />
              {/* Bright red cab */}
              <path
                d="M 2 -6.5 L 12 -6.5 Q 16 -6.5 17 -3.5 L 17 3.5 Q 16 6.5 12 6.5 L 2 6.5 Z"
                fill="#D92323"
              />
              <rect x="3" y="-5" width="8.5" height="9" rx="1.4" fill="#EA3A3A" />
              <path d="M 11.5 -4.8 L 14.8 -3.6 L 14.8 3.6 L 11.5 4.8 Z" fill="#171717" />
              <rect x="16.5" y="-5.2" width="1.6" height="2.2" rx="0.6" fill="#FFF3C4" />
              <rect x="16.5" y="3" width="1.6" height="2.2" rx="0.6" fill="#FFF3C4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
