export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="50"
      height="50"
    >
      <defs>
        <linearGradient id="lg-blend" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="30%" stop-color="#8FD3FE" />
          <stop offset="70%" stop-color="#1D6FF2" />
          <stop offset="100%" stop-color="#5A3EFF" />
        </linearGradient>
        <radialGradient id="rg-blend" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#8FD3FE" stop-opacity="0.35" />
          <stop offset="60%" stop-color="#1D6FF2" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#191B1F" stop-opacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(100,100)">
        <circle
          r="74"
          fill="none"
          stroke="url(#lg-blend)"
          stroke-width="8"
          opacity="0.9"
        />
      </g>
      <circle cx="100" cy="100" r="55" fill="url(#rg-blend)" opacity="0.9" />
      <polygon
        points="100,0 70,90 110,90 70,190 140,90 100,90 130,20"
        fill="#FFD507"
      />
    </svg>
  );
}
