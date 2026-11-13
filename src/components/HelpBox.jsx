import { Fragment } from 'react'
import { Info } from './Icons.jsx'
import './HelpBox.css'

/**
 * 용어 설명 상자.
 * items: ReactNode[] — 항목 사이에 짧은 대시를 둡니다.
 */
export default function HelpBox({ title = '용어 설명', items, image, imageAlt }) {
  return (
    <div className="helpbox-wrap">
      <div className="helpbox">
        <span className="helpbox__head">
          <Info />
          {title}
        </span>
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="dash" aria-hidden="true" />}
            <p className="helpbox__text">{item}</p>
          </Fragment>
        ))}
      </div>
      {image && <img className="helpbox__img" src={image} alt={imageAlt} width="400" height="240" loading="lazy" />}
    </div>
  )
}
