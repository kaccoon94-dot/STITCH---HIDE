import { Fragment } from 'react'
import { IMAGES } from '../data/images.js'
import { FOOTER_LINKS } from '../data/options.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer id="FTR" className="footer" data-theme="dark">
      <div className="footer__inner">
        <img className="footer__logo" src={IMAGES.logo} alt="STITCH & HIDE" width="160" height="36" />
        <nav className="footer__links" aria-label="약관 및 안내">
          <p>
            {FOOTER_LINKS.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && <span aria-hidden="true">·</span>}
                {/* 목적지 [미정] */}
                <a href="#" className={link.strong ? 'is-strong' : undefined} onClick={(e) => e.preventDefault()}>
                  {link.label}
                </a>
              </Fragment>
            ))}
          </p>
        </nav>
      </div>
    </footer>
  )
}
