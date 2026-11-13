import { Minus, Plus } from './Icons.jsx'
import './Stepper.css'

// 수량 스테퍼 (− n +). [임시] 최대 9개
export default function Stepper({ value, onChange, min = 1, max = 9, label = '수량' }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" aria-label={`${label} 줄이기`} onClick={() => onChange(value - 1)} disabled={value <= min}>
        <Minus />
      </button>
      <output aria-live="polite" aria-label={`${label} ${value}개`}>
        {value}
      </output>
      <button type="button" aria-label={`${label} 늘리기`} onClick={() => onChange(value + 1)} disabled={value >= max}>
        <Plus />
      </button>
    </div>
  )
}
