// 상품 가상 데이터 (출처: docs/04-site-wireframe.md P03·P04)
// [임시] 표시가 붙은 값은 문서에 없어 임시로 채운 값입니다. PROJECT_CONTEXT.md 9번 참고.

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
    image: IMAGES.models[0],
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
    detailDesc: '작은 손을 위한 10.5인치 주니어 글러브.', // [임시]
    image: IMAGES.models[1],
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
    detailDesc: '외야 플레이를 위한 12.75인치 글러브.', // [임시]
    image: IMAGES.models[2],
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
    weight: '약 580 g', // [임시]
    recommendPosition: '투수',
    tagline: '투구 전 그립을 가리는 클로즈드 웹',
    resultDesc: '투구 전 그립을 가리는 클로즈드 웹을 살펴보세요.',
    detailDesc: '투수 플레이를 위한 12인치 글러브.', // [임시]
    image: IMAGES.models[3],
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
    weight: '약 700 g', // [임시]
    recommendPosition: '포수',
    tagline: '투구를 받는 플레이를 위한 깊은 포구부',
    resultDesc: '투구를 받는 플레이를 위한 깊은 포구부를 살펴보세요.',
    detailDesc: '포수 플레이를 위한 33인치 미트.', // [임시]
    image: IMAGES.models[4],
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
    weight: '약 650 g', // [임시]
    recommendPosition: '1루수',
    tagline: '송구를 받아내는 1루 플레이를 위한 형태',
    resultDesc: '송구를 받아내는 1루 플레이를 위한 형태를 살펴보세요.',
    detailDesc: '1루 플레이를 위한 12.5인치 미트.', // [임시]
    image: IMAGES.models[5],
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

// [임시] 모델마다 기본 크기 ±0.5인치 세 가지를 사이즈 옵션으로 둡니다.
export function sizeOptions(product) {
  return [product.size - 0.5, product.size, product.size + 0.5]
}

export function wearHand(throwHand) {
  return throwHand === '오른손' ? '왼손 착용' : '오른손 착용'
}

export function optionLabel(size, throwHand) {
  return `${formatSize(size)} · ${throwHand} 투구 / ${wearHand(throwHand)}`
}
