import './ChoiceChips.css'

/**
 * 여러 선택지 중 하나만 고르는 칩 묶음.
 * options: string[] | {label, value}[]
 * variant: 'chip' | 'tile' (결제 수단 타일)
 */
export default function ChoiceChips({ legend, options, value, onChange, variant = 'chip', wide = false, hideLegend = false }) {
  return (
    <fieldset className="chips">
      <legend className={hideLegend ? 'visually-hidden' : 'chips__legend t-label'}>{legend}</legend>
      <div className={`chips__list chips__list--${variant}`}>
        {options.map((o) => {
          const label = typeof o === 'string' ? o : o.label
          const v = typeof o === 'string' ? o : o.value
          const on = v === value
          return (
            <button
              key={v}
              type="button"
              className={`chip chip--${variant}${wide ? ' chip--wide' : ''}`}
              aria-pressed={on}
              onClick={() => onChange(v)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
