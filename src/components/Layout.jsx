import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import GNB from './GNB.jsx'
import Footer from './Footer.jsx'

function smooth() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

// 주소가 바뀌면 맨 위로, #이 있으면 그 섹션으로 부드럽게 이동합니다.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // 페이지가 그려진 다음 이동
      const t = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: smooth(), block: 'start' })
      }, 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <ScrollManager />
      <GNB />
      <Outlet />
      <Footer />
    </>
  )
}
