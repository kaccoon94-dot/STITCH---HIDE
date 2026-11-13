import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'
import './Button.css'

/**
 * 버튼 5종류 중 주·보조·텍스트 (플로팅은 FloatingButtons).
 * 종류는 모양으로, 색은 ★(star) 여부로 정합니다.
 *
 * variant: 'primary' | 'secondary' | 'text'
 * star:    ★ 핵심 행동이면 ember
 * glow:    어두운 배경 위 ★ 주 버튼의 빛 테(shadow-ember)
 * large:   페이지의 첫 ★ 버튼(60px)
 * arrow:   다음 단계로 가는 ★ 버튼의 오른쪽 화살표
 */
export default function Button({
  to,
  variant = 'primary',
  star = false,
  glow = false,
  large = false,
  arrow = false,
  className = '',
  children,
  id,
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    star && 'btn--star',
    glow && 'btn--glow',
    large && 'btn--lg',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn__arrow" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} data-id={id} {...rest}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} data-id={id} {...rest}>
      {content}
    </button>
  )
}
