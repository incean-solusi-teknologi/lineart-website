export function PrintWaves() {
  return (
    <div className="print-waves" aria-hidden="true">
      <svg viewBox="0 0 1600 1800" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="print-wave-magenta" x2="0" y2="1">
            <stop stopColor="#ec008c" />
            <stop offset=".16" stopColor="#ec008c" stopOpacity=".65" />
            <stop offset=".38" stopColor="#ec008c" stopOpacity=".12" />
            <stop offset="1" stopColor="#ec008c" stopOpacity=".08" />
          </linearGradient>
          <linearGradient id="print-wave-yellow" x2="0" y2="1">
            <stop stopColor="#ffe500" />
            <stop offset=".2" stopColor="#ffe500" stopOpacity=".7" />
            <stop offset=".42" stopColor="#ffe500" stopOpacity=".18" />
            <stop offset="1" stopColor="#ffe500" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="print-wave-cyan" x2="0" y2="1">
            <stop stopColor="#00b5dd" stopOpacity=".65" />
            <stop offset=".26" stopColor="#00b5dd" stopOpacity=".28" />
            <stop offset=".5" stopColor="#00b5dd" stopOpacity=".13" />
            <stop offset="1" stopColor="#00b5dd" stopOpacity=".22" />
          </linearGradient>
          <path
            id="print-ribbon-right"
            d="M1650-65C1340-65 1090 35 1080 210C1072 350 1470 370 1580 555C1730 810 1420 1000 1510 1240C1550 1370 1680 1440 1640 1850L1710 1850C1750 1410 1605 1340 1575 1220C1510 1000 1800 820 1650 520C1530 300 1140 310 1148 210C1160 90 1390 25 1650 35Z"
          />
          <path
            id="print-ribbon-left"
            d="M1030 105C760 150 450 230 375 420C290 630-180 650-85 850C-20 1010 210 1050 125 1230C40 1410-95 1500 110 1640C320 1810 740 1680 1040 1840L980 1900C690 1770 280 1910 60 1700C-180 1480-35 1340 45 1200C135 1040-100 1000-155 880C-260 630 240 570 310 405C410 190 750 115 1030 105Z"
          />
        </defs>
        <g className="print-wave-layer print-wave-cyan">
          <g className="print-wave-flow print-wave-flow-cyan">
            <use href="#print-ribbon-left" fill="url(#print-wave-cyan)" />
          </g>
        </g>
        <g className="print-wave-layer print-wave-blue">
          <g className="print-wave-flow print-wave-flow-blue">
            <use
              href="#print-ribbon-left"
              transform="translate(-48 64)"
              fill="#0754a3"
              opacity=".05"
            />
          </g>
        </g>
        <g className="print-wave-layer print-wave-magenta">
          <g className="print-wave-flow print-wave-flow-magenta">
            <use href="#print-ribbon-right" fill="url(#print-wave-magenta)" />
          </g>
        </g>
        <g className="print-wave-layer print-wave-yellow">
          <g className="print-wave-flow print-wave-flow-yellow">
            <use
              href="#print-ribbon-right"
              transform="translate(90 -18)"
              fill="url(#print-wave-yellow)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
