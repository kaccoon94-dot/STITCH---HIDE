// [임시] 추천 규칙표 — 내용은 PROJECT_CONTEXT.md에서 [미정]이라 임시로 정했습니다.
//
// 나:   포지션 → 모델 (시안과 같음)
//       손 길이 17.5 cm 미만 → 기본 크기 -0.5인치
//       17.5 ~ 20.0 cm       → 기본 크기
//       20.0 cm 초과          → 기본 크기 +0.5인치
// 아이: 주니어 핏 글러브
//       손 길이 13.0 cm 미만 → 10인치
//       13.0 ~ 15.5 cm       → 10.5인치
//       15.5 cm 초과          → 11인치
// 착용 손: 오른손 투구 → 왼손 착용, 왼손 투구 → 오른손 착용

import { getProduct, sizeOptions, wearHand } from './products.js'

const POSITION_MODEL = {
  투수: 'balance-fit-pitcher',
  내야수: 'field-fit-infield',
  외야수: 'range-fit-outfield',
  포수: 'pocket-fit-catcher',
  '1루수': 'base-fit-first',
}

export function recommend({ who, position, hand, throwHand }) {
  const isChild = who === 'child'
  const product = getProduct(isChild ? 'junior-fit' : POSITION_MODEL[position])
  const [small, base, large] = sizeOptions(product)

  let size = base
  if (isChild) {
    if (hand < 13) size = small
    else if (hand > 15.5) size = large
  } else {
    if (hand < 17.5) size = small
    else if (hand > 20) size = large
  }

  return {
    product,
    size,
    throwHand,
    wear: wearHand(throwHand),
    basis: isChild ? '아이' : position,
  }
}
