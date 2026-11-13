// 1.6~2px 선 아이콘 (24 그리드, 둥근 끝), currentColor

function Svg({ size = 24, stroke = 2, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p) => (
  <Svg size={18} {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
)

export const ChevronUp = (p) => (
  <Svg size={16} {...p}>
    <path d="M6 15l6-6 6 6" />
  </Svg>
)

export const Bag = (p) => (
  <Svg size={22} stroke={1.6} {...p}>
    <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Svg>
)

// 라인업: 모델 카드가 놓인 격자
export const Grid = (p) => (
  <Svg size={22} stroke={1.6} {...p}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
  </Svg>
)

// 브랜드 스토리: 실을 꿴 바늘 (공방의 바느질)
export const Needle = (p) => (
  <Svg size={22} stroke={1.6} {...p}>
    <path d="M3.5 20.5L16.6 5.8a2 2 0 0 1 2.9 2.8z" />
    <path d="M17.4 7.2l.6-.6" />
    <path d="M18.6 8.6c2 2.8 1.2 6.4-2 7.6-2.6 1-4.4 1.8-4.6 4.3" strokeDasharray="2 2.2" />
  </Svg>
)

export const User = (p) => (
  <Svg size={22} stroke={1.6} {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
  </Svg>
)

export const Info = (p) => (
  <Svg size={18} stroke={1.8} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 8h.01" />
  </Svg>
)

export const Star = (p) => (
  <Svg size={18} {...p}>
    <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />
  </Svg>
)

export const Check = (p) => (
  <Svg size={28} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
)

export const Menu = (p) => (
  <Svg size={22} stroke={1.8} {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Svg>
)

export const Close = (p) => (
  <Svg size={22} stroke={1.8} {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Svg>
)

export const Minus = (p) => (
  <Svg size={16} {...p}>
    <path d="M5 12h14" />
  </Svg>
)

export const Plus = (p) => (
  <Svg size={16} {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Svg>
)

export const Alert = (p) => (
  <Svg size={16} stroke={1.8} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5" />
    <path d="M12 16.5h.01" />
  </Svg>
)
