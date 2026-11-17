// 상품 가상 데이터 (출처: docs/04-site-wireframe.md P03·P04)
// 와이어프레임에 없던 값(무게 일부, P04 설명·웹 형태·포구부)은 확정한 가상 값입니다 (사용자 답변 2026-11-17).

import { IMAGES } from './images.js'

export const SHIPPING_FEE = 3000

export const PRODUCTS = [
  {
    id: 'field-fit-infield',
    name: '필드 핏 내야수 글러브',
    nameLines: ['필드 핏', '내야수 글러브'],
    price: 189000,
    filter: '내야수',
    usage: '내야수용',
    size: 11.5,
    leather: '소가죽',
    weight: '약 550 g',
    recommendPosition: '내야수',
    tagline: '공을 잡고 빠르게 꺼내는 플레이를 위한 선택',
    resultDesc: '빠른 송구를 위한 공 꺼내기와 착용감을 살펴보세요.',
    detailDesc: '내야 플레이를 위한 11.5인치 글러브.',
    // P04 상세 내용 — 사진 속 형태를 보고 채운 값입니다.
    detailNote: '얕은 포구부와 열린 웹으로 공을 잡자마자 빠르게 꺼낼 수 있습니다.',
    web: 'H웹 (열린 웹)',
    webNote: '웹 사이로 시야가 트여 땅볼을 끝까지 보고 잡을 수 있습니다.',
    pocket: '얕은 포구부',
    pocketNote: '잡은 공을 바로 꺼내 송구로 이어지게 하는 깊이입니다.',
    image: IMAGES.models[0],
    gallery: IMAGES.detailGalleries[0],
  },
  {
    id: 'junior-fit',
    name: '주니어 핏 글러브',
    nameLines: ['주니어 핏', '글러브'],
    price: 129000,
    filter: null, // 주니어용: '전체'에서만 보입니다.
    usage: '주니어용',
    size: 10.5,
    leather: '소가죽',
    weight: '약 430 g',
    recommendPosition: '주니어 · 포지션 입문',
    tagline: '작은 손에 맞는 크기와 착용감을 확인하세요',
    resultDesc: '작은 손에 맞는 크기와 착용감을 확인하세요.',
    detailDesc: '작은 손을 위한 10.5인치 주니어 글러브.',
    detailNote: '가볍고 손가락이 짧아 처음 글러브를 쓰는 아이도 쉽게 오므릴 수 있습니다.',
    web: '바스켓 웹 (엮은 웹)',
    webNote: '가죽을 엮은 웹이 공을 부드럽게 받아 줍니다.',
    pocket: '보통 깊이',
    pocketNote: '여러 포지션을 두루 익히기 좋은 깊이입니다.',
    image: IMAGES.models[1],
    gallery: IMAGES.detailGalleries[1],
  },
  {
    id: 'range-fit-outfield',
    name: '레인지 핏 외야수 글러브',
    nameLines: ['레인지 핏', '외야수 글러브'],
    price: 219000,
    filter: '외야수',
    usage: '외야수용',
    size: 12.75,
    leather: '소가죽',
    weight: '약 620 g',
    recommendPosition: '외야수',
    tagline: '넓은 포구 범위를 원하는 외야 플레이에',
    resultDesc: '넓은 포구 범위를 원하는 외야 플레이에 맞는지 살펴보세요.',
    detailDesc: '외야 플레이를 위한 12.75인치 글러브.',
    detailNote: '긴 손가락과 깊은 포구부로 멀리 뻗어 뜬공을 잡는 플레이에 맞췄습니다.',
    web: 'H웹 (열린 웹)',
    webNote: '높이 뜬 공을 웹 사이로 보며 잡을 수 있습니다.',
    pocket: '깊은 포구부',
    pocketNote: '달려가며 잡은 공이 빠지지 않게 받쳐 줍니다.',
    image: IMAGES.models[2],
    gallery: IMAGES.detailGalleries[2],
  },
  {
    id: 'balance-fit-pitcher',
    name: '밸런스 핏 투수 글러브',
    nameLines: ['밸런스 핏', '투수 글러브'],
    price: 199000,
    filter: '투수',
    usage: '투수용',
    size: 12,
    leather: '소가죽',
    weight: '약 580 g',
    recommendPosition: '투수',
    tagline: '투구 전 그립을 가리는 클로즈드 웹',
    resultDesc: '투구 전 그립을 가리는 클로즈드 웹을 살펴보세요.',
    detailDesc: '투수 플레이를 위한 12인치 글러브.',
    detailNote: '닫힌 웹이 공을 쥔 손을 가려 타자에게 그립이 보이지 않습니다.',
    web: '클로즈드 웹 (닫힌 웹)',
    webNote: '투구 전 그립을 바깥에서 볼 수 없게 가려 줍니다.',
    pocket: '보통 깊이',
    pocketNote: '투구 뒤 날아오는 타구에도 대응하기 좋은 깊이입니다.',
    image: IMAGES.models[3],
    gallery: IMAGES.detailGalleries[3],
  },
  {
    id: 'pocket-fit-catcher',
    name: '포켓 핏 포수 미트',
    nameLines: ['포켓 핏', '포수 미트'],
    price: 249000,
    filter: '포수·1루수',
    usage: '포수용',
    size: 33,
    leather: '소가죽',
    weight: '약 700 g',
    recommendPosition: '포수',
    tagline: '투구를 받는 플레이를 위한 깊은 포구부',
    resultDesc: '투구를 받는 플레이를 위한 깊은 포구부를 살펴보세요.',
    detailDesc: '포수 플레이를 위한 33인치 미트.',
    detailNote: '두툼한 테두리와 깊은 포구부가 빠른 투구를 안정적으로 받아 냅니다.',
    web: '바 웹 미트 (손가락 구분 없음)',
    webNote: '한 덩어리로 감싸는 형태라 공이 튀어 나가지 않습니다.',
    pocket: '깊은 포구부',
    pocketNote: '반복되는 강한 투구를 포구부 가운데로 모아 줍니다.',
    image: IMAGES.models[4],
    gallery: IMAGES.detailGalleries[4],
  },
  {
    id: 'base-fit-first',
    name: '베이스 핏 1루 미트',
    nameLines: ['베이스 핏', '1루 미트'],
    price: 239000,
    filter: '포수·1루수',
    usage: '1루수용',
    size: 12.5,
    leather: '소가죽',
    weight: '약 650 g',
    recommendPosition: '1루수',
    tagline: '송구를 받아내는 1루 플레이를 위한 형태',
    resultDesc: '송구를 받아내는 1루 플레이를 위한 형태를 살펴보세요.',
    detailDesc: '1루 플레이를 위한 12.5인치 미트.',
    detailNote: '길고 넓은 미트가 짧거나 빗나간 송구도 끝까지 받아 냅니다.',
    web: 'H웹 미트 (열린 웹)',
    webNote: '웹 사이로 송구를 보며 베이스를 밟고 받을 수 있습니다.',
    pocket: '깊은 포구부',
    pocketNote: '낮게 튀는 송구도 한 번에 떠서 담아 줍니다.',
    image: IMAGES.models[5],
    gallery: IMAGES.detailGalleries[5],
  },
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(n) {
  return `${n.toLocaleString('ko-KR')}원`
}

export function formatSize(n) {
  return `${n}인치`
}

// 모델마다 기본 크기 ±0.5인치 세 가지를 사이즈 옵션으로 둡니다.
export function sizeOptions(product) {
  return [product.size - 0.5, product.size, product.size + 0.5]
}

export function wearHand(throwHand) {
  return throwHand === '오른손' ? '왼손 착용' : '오른손 착용'
}

export function optionLabel(size, throwHand) {
  return `${formatSize(size)} · ${throwHand} 투구 / ${wearHand(throwHand)}`
}
