import { Link } from 'react-router-dom'
import { ChevronUp, Star } from './Icons.jsx'
import './FloatingButtons.css'

// FLT: 메인(P01)에만, 오른쪽 아래 고정
export default function FloatingButtons() {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <div id="FLT" className="flt">
      <Link to="/recommend" className="flt__btn flt__btn--star" data-id="F-01" aria-label="맞춤 추천">
        <Star />
        추천
      </Link>
      <button type="button" className="flt__btn flt__btn--top" data-id="F-02" aria-label="페이지 맨 위로" onClick={toTop}>
        <ChevronUp />
        TOP
      </button>
    </div>
  )
}
