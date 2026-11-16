import { useEffect, useRef } from 'react'

// 화면에 들어올 때 한 번만 서서히 나타나게 합니다 (.reveal → .is-visible).
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    // [모바일 #9] 터치 기기(모바일·태블릿): 한 칸이라도 보이면 모든 칸을 한 번에 나타나게 합니다.
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      const cells = el.querySelectorAll('.reveal')
      const ioAll = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            cells.forEach((n) => n.classList.add('is-visible'))
            ioAll.disconnect()
          }
        },
        { threshold: 0.15 },
      )
      cells.forEach((n) => ioAll.observe(n))
      return () => ioAll.disconnect()
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return ref
}
