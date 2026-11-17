import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IMAGES } from '../data/images.js'
import useColorMode from '../hooks/useColorMode.js'
import { ArrowRight, Bag, Close, Grid, Menu, Moon, Needle, Sun, User } from './Icons.jsx'
import './GNB.css'

export default function GNB() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  // 메뉴를 연 페이지에서만 열려 있게 합니다(페이지가 바뀌면 자동으로 닫힘).
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === pathname
  const setOpen = (v) => setOpenPath(v ? pathname : null)
  const onRecommend = pathname === '/recommend'
  const [mode, toggleMode] = useColorMode()
  const nextLabel = mode === 'dark' ? '화이트 모드' : '다크 모드'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpenPath(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // 메뉴가 열려 있을 때 메뉴·열기/닫기 버튼 밖을 누르면 닫습니다.
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (menuRef.current?.contains(e.target) || toggleRef.current?.contains(e.target)) return
      setOpenPath(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header id="GNB" className={`gnb${scrolled ? ' is-scrolled' : ''}`} data-theme="dark">
      <nav className="gnb__bar" aria-label="주 메뉴">
        <Link to="/" className="gnb__logo" data-id="M-01" aria-label="STITCH & HIDE 메인으로">
          <img src={IMAGES.logo} alt="" width="240" height="54" />
        </Link>

        <div className={`gnb__menu${open ? ' is-open' : ''}`} id="gnb-menu" ref={menuRef}>
          <Link to="/#brand-story" className="gnb__item" data-id="M-04" onClick={close}>
            <Needle />
            브랜드 스토리
          </Link>
          <Link to="/lineup" className="gnb__item" data-id="M-03" onClick={close}>
            <Grid />
            라인업
          </Link>
          <Link to="/cart" className="gnb__item" data-id="M-05" onClick={close}>
            <Bag />
            장바구니
          </Link>
          <Link to="/login" className="gnb__item" data-id="M-06" onClick={close}>
            <User />
            로그인
          </Link>
          <button
            type="button"
            className="gnb__item gnb__item--button gnb__mode"
            aria-label={`${nextLabel}로 바꾸기`}
            title={`${nextLabel}로 바꾸기`}
            onClick={toggleMode}
          >
            {mode === 'dark' ? <Sun /> : <Moon />}
            <span className="gnb__mode-label">{nextLabel}</span>
          </button>
        </div>

        <Link
          to="/recommend"
          className="gnb__cta"
          data-id="M-02"
          aria-current={onRecommend ? 'page' : undefined}
        >
          맞춤 추천
          {onRecommend ? <span className="gnb__dot" aria-hidden="true" /> : <ArrowRight size={16} />}
        </Link>

        <button
          type="button"
          className="gnb__toggle"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="gnb-menu"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setOpen(!open)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </nav>
    </header>
  )
}
