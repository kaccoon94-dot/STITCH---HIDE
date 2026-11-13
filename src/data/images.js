// 이미지 에셋: 후보 두 장 중 01번을 씁니다 (사용자 답변 2026-11-13).
// 다른 후보로 바꾸려면 아래 경로의 파일명만 바꾸면 됩니다.

import logo from '../assets/logo/logo 01.jpg'

import heroBg from '../assets/P01/P01-S01 01-01.jpg'
import storyLeather from '../assets/P01/P01-S02 02-01.jpg'
import storyCraftsman from '../assets/P01/P01-S02 03-01.jpg'

import handMeasure from '../assets/P02/P02-S01 01.jpg'

import model01 from '../assets/P03/P03-S01 01-01.jpg'
import model02 from '../assets/P03/P03-S01 02-01.jpg'
import model03 from '../assets/P03/P03-S01 03-01.jpg'
import model04 from '../assets/P03/P03-S01 04-01.jpg'
import model05 from '../assets/P03/P03-S01 05-01.jpg'
import model06 from '../assets/P03/P03-S01 06-01.jpg'

import detail01 from '../assets/P04/P04-S01 01.jpg'
import detail02 from '../assets/P04/P04-S01 02.jpg'
import detail03 from '../assets/P04/P04-S01 03.jpg'
import detail04 from '../assets/P04/P04-S01 04.jpg'
import detail05 from '../assets/P04/P04-S01 05.jpg'

import care01 from '../assets/P04/P04-S02 01-01.jpg'
import care02 from '../assets/P04/P04-S02 02-01.jpg'
import care03 from '../assets/P04/P04-S02 03-01.jpg'

export const IMAGES = {
  logo,
  heroBg,
  storyLeather,
  storyCraftsman,
  handMeasure,
  // P03 모델 카드 순서(04-site-wireframe.md 표 순서)와 같습니다.
  models: [model01, model02, model03, model04, model05, model06],
  // P04-S01: 01 = 대표, 02~05 = 썸네일
  detailGallery: [detail01, detail02, detail03, detail04, detail05],
  care: [care01, care02, care03],
}
