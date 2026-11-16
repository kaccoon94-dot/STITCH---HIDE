import { useNavigate } from 'react-router-dom'
import { formatPrice, formatSize } from '../data/products.js'
import Button from './Button.jsx'
import './ModelCard.css'

// P03 모델 카드 (light): 위쪽 이름·가격 → 이미지 → 태그·설명 → 비교 담기 + 상세 보기
// 마우스 위치에 따라 카드를 3D로 기울입니다 (사용자 요청 2026-11-13, Uiverse 카드 효과의 움직임만 브랜드 색으로).
// 위쪽 +6° ~ 아래쪽 −6°(rotateX), 왼쪽 −4° ~ 오른쪽 +4°(rotateY) — 원본보다 약하게 (사용자 요청). 마우스가 없는 화면·움직임 줄이기 설정에서는 끕니다.
const canTilt = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tilt(e) {
  if (!canTilt()) return
  const el = e.currentTarget
  const box = el.getBoundingClientRect()
  const x = (e.clientX - box.left) / box.width
  const y = (e.clientY - box.top) / box.height
  el.style.setProperty('--rx', `${(0.5 - y) * 12}deg`)
  el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`)
  el.style.setProperty('--gx', `${x * 100}%`)
  el.style.setProperty('--gy', `${y * 100}%`)
}

function resetTilt(e) {
  const el = e.currentTarget
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

export default function ModelCard({ product, compared, compareDisabled, onToggleCompare }) {
  const checkId = `cmp-${product.id}`
  const navigate = useNavigate()

  // 카드 아무 곳이나 누르면 상세 보기로 이동 (사용자 요청 2026-11-16).
  // '비교 담기'·'상세 보기'처럼 자체 동작이 있는 요소를 누른 경우는 제외합니다.
  const openDetail = (e) => {
    if (e.target.closest('a, button, input, label')) return
    navigate(`/product/${product.id}`)
  }

  return (
    <article className="mc" onMouseMove={tilt} onMouseLeave={resetTilt} onClick={openDetail}>
      <header className="mc__head">
        <h3 className="t-label">{product.name}</h3>
        <span className="mc__price">{formatPrice(product.price)}</span>
      </header>
      <div className="mc__img">
        <img src={product.image} alt={`${product.name} 이미지`} width="384" height="260" loading="lazy" />
      </div>
      <ul className="mc__tags" aria-label="특징">
        <li>{product.usage}</li>
        <li>{formatSize(product.size)}</li>
        <li>{product.leather}</li>
      </ul>
      <p className="mc__desc t-body-sm ink-soft">{product.tagline}</p>
      <div className="mc__foot">
        <label className={`mc__check${compareDisabled ? ' is-disabled' : ''}`} htmlFor={checkId}>
          <input
            id={checkId}
            type="checkbox"
            checked={compared}
            disabled={compareDisabled}
            onChange={() => onToggleCompare(product.id)}
          />
          비교 담기
        </label>
        <Button to={`/product/${product.id}`} variant="secondary" id="P03-S01-B01" className="mc__detail">
          상세 보기
        </Button>
      </div>
    </article>
  )
}
