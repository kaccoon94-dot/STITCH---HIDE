import { Fragment } from 'react'
import { IMAGES } from '../data/images.js'
import { FOOTER_LINKS } from '../data/options.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer id="FTR" className="footer" data-theme="dark">
      <div className="footer__inner">
        <img className="footer__logo" src={IMAGES.logo} alt="STITCH & HIDE" width="160" height="36" />
        {/* 약관·안내는 이동할 페이지가 없어 링크 없이 글자만 둡니다 (사용자 답변 2026-11-17). */}
        <div className="footer__links">
          <p>
            {FOOTER_LINKS.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && <span aria-hidden="true">·</span>}
                <span className={`footer__item${link.strong ? ' is-strong' : ''}`}>{link.label}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
