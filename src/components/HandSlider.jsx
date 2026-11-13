import { Minus, Plus } from './Icons.jsx'
import './HandSlider.css'

// 손 길이 슬라이더: 현재 값을 오른쪽 위에 세리프 숫자로 표시. 단계 0.5 cm
export default function HandSlider({ id, label, hint, min, max, step = 0.5, value, onChange }) {
  const clamp = (v) => Math.min(max, Math.max(min, Math.round(v * 2) / 2))
  const text = `${Number(value).toFixed(1)} cm`

  return (
    <div className="hs">
      <div className="hs__head">
        <label htmlFor={id} className="t-label">
          {label} {hint && <span className="hs__hint">({hint})</span>}
        </label>
        <output htmlFor={id} className="hs__value t-heading-sm" aria-live="polite">
          {text}
        </output>
      </div>
      <div className="hs__row">
        <button
          type="button"
          className="hs__step"
          aria-label="손 길이 0.5 cm 줄이기"
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
        >
          <Minus />
        </button>
        <input
          id={id}
          className="hs__range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={text}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ '--pct': `${((value - min) / (max - min)) * 100}%` }}
        />
        <button
          type="button"
          className="hs__step"
          aria-label="손 길이 0.5 cm 늘리기"
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
        >
          <Plus />
        </button>
      </div>
      <div className="hs__ends t-caption ink-muted" aria-hidden="true">
        <span>{min} cm</span>
        <span>{max} cm</span>
      </div>
    </div>
  )
}
