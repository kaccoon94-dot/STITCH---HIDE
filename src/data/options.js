// 선택지 목록. [임시] 표시는 문서에 없어 임시로 채운 값입니다.

export const WHO_OPTIONS = [
  { label: '나', value: 'me' },
  { label: '아이', value: 'child' },
]

export const POSITION_OPTIONS = ['투수', '내야수', '외야수', '포수', '1루수']

export const THROW_OPTIONS = ['오른손', '왼손']

// [임시] 아이 나이 선택지
export const CHILD_AGE_OPTIONS = ['5세', '6세', '7세', '8세', '9세', '10세', '11세', '12세', '13세']

export const LINEUP_FILTERS = ['전체', '투수', '내야수', '외야수', '포수·1루수']

export const PAYMENT_OPTIONS = ['신용카드', '계좌이체', '간편결제']

// [임시] 배송 요청사항 선택지
export const DELIVERY_REQUEST_OPTIONS = [
  '문 앞에 놓아 주세요',
  '경비실에 맡겨 주세요',
  '택배함에 넣어 주세요',
  '배송 전에 연락 주세요',
]

// [임시] P03~P06 섹션 머리 라벨 (P02는 시안의 STEP 라벨)
export const EYEBROWS = {
  recommendInput: 'STEP 1 · 조건 선택',
  recommendResult: 'STEP 2 · 추천 결과',
  lineup: 'LINEUP · 모델 목록',
  compare: 'COMPARE · 모델 비교',
  care: 'CARE · 관리법',
  cart: 'CART · 담은 글러브',
  cartSummary: 'ORDER · 주문 금액',
  shipping: 'STEP 1 · 배송 정보',
  payment: 'STEP 2 · 결제 수단',
  orderSummary: 'STEP 3 · 주문 요약',
}

// FTR 링크: 목적지 [미정] — 새 페이지를 만들지 않기로 해서 이동 없이 둡니다.
// 한 줄로 표시 (사용자 요청 2026-11-13, 와이어프레임은 2줄)
export const FOOTER_LINKS = [
  { label: '이용약관' },
  { label: '개인정보처리방침', strong: true },
  { label: '이용안내' },
  { label: '배송 안내' },
  { label: '교환 및 반품 안내' },
  { label: '고객센터' },
]
