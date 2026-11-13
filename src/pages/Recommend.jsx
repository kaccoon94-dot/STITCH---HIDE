import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import ChoiceChips from '../components/ChoiceChips.jsx'
import HandSlider from '../components/HandSlider.jsx'
import HelpBox from '../components/HelpBox.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useCart } from '../context/CartContext.jsx'
import { IMAGES } from '../data/images.js'
import { CHILD_AGE_OPTIONS, EYEBROWS, POSITION_OPTIONS, THROW_OPTIONS, WHO_OPTIONS } from '../data/options.js'
import { formatPrice, formatSize } from '../data/products.js'
import { recommend } from '../data/recommend.js'
import './Recommend.css'

// P02 맞춤 추천 — 입력(S01)과 결과(S02)는 같은 주소 안에서 화면만 바꿉니다.
export default function Recommend() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [screen, setScreen] = useState('input')
  const [who, setWho] = useState('me')
  const [position, setPosition] = useState('내야수')
  const [hand, setHand] = useState(18.5)
  const [throwHand, setThrowHand] = useState('오른손')
  const [childAge, setChildAge] = useState('')
  const [childHand, setChildHand] = useState(15.0)
  const [childThrow, setChildThrow] = useState('오른손')

  const isChild = who === 'child'
  const input = isChild
    ? { who, position, hand: childHand, throwHand: childThrow }
    : { who, position, hand, throwHand }
  const result = recommend(input)
  const handText = `${Number(input.hand).toFixed(1)} cm`

  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  const showResult = (e) => {
    e.preventDefault()
    setScreen('result')
    scrollTop()
  }

  const again = () => {
    setScreen('input')
    scrollTop()
  }

  const addToCart = () => {
    addItem({ productId: result.product.id, size: result.size, throwHand: result.throwHand, qty: 1 })
    navigate('/cart')
  }

  return (
    <main id="main" tabIndex={-1} className="page-light" data-theme="light">
      {screen === 'input' ? (
        <section id="P02-S01" className="container section section--last" aria-labelledby="s01-title">
          <SectionHeader
            eyebrow={EYEBROWS.recommendInput}
            title="내 손에 맞는 글러브를 찾아보세요"
            as="h1"
            size="display-lg"
            titleId="s01-title"
            lead="사용할 사람, 포지션, 손 길이와 주로 던지는 손을 선택해 주세요."
          />

          <div className="form-layout rec__layout">
            <form className="form-panel" onSubmit={showResult}>
              <ChoiceChips legend="누가 쓸 글러브인가요?" options={WHO_OPTIONS} value={who} onChange={setWho} wide />
              <ChoiceChips legend="포지션" options={POSITION_OPTIONS} value={position} onChange={setPosition} />

              {!isChild && (
                <>
                  <HandSlider
                    id="hand-me"
                    label="손 길이"
                    hint="손목 주름 ~ 가운뎃손가락 끝"
                    min={15}
                    max={23}
                    value={hand}
                    onChange={setHand}
                  />
                  <ChoiceChips legend="주로 던지는 손" options={THROW_OPTIONS} value={throwHand} onChange={setThrowHand} wide />
                </>
              )}

              {isChild && (
                <div id="P02-S01A" className="rec__child">
                  <span className="t-eyebrow ink-muted rec__child-label">아이 기준 추천</span>
                  <div className="field">
                    <label htmlFor="child-age" className="field__label">
                      아이 나이
                    </label>
                    <select
                      id="child-age"
                      className={`select${childAge ? '' : ' select--placeholder'}`}
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                    >
                      <option value="">나이를 선택해 주세요</option>
                      {CHILD_AGE_OPTIONS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <HandSlider id="hand-child" label="손 길이" min={10} max={18} value={childHand} onChange={setChildHand} />
                  <ChoiceChips legend="주로 던지는 손" options={THROW_OPTIONS} value={childThrow} onChange={setChildThrow} wide />
                </div>
              )}

              <Button type="submit" star large arrow id="P02-S01-B01" className="rec__submit">
                추천 결과 보기
              </Button>
            </form>

            <aside className="help-aside" aria-label="용어 설명">
              <HelpBox
                items={[
                  <>
                    <strong>손 길이</strong>: 손목 주름부터 가운뎃손가락 끝까지
                    <br />
                    손을 편 상태에서 자로 측정해 주세요.
                  </>,
                  <>
                    오른손으로 던지면 왼손에 끼는 글러브를,
                    <br />
                    왼손으로 던지면 오른손에 끼는 글러브를
                    <br />
                    선택합니다.
                  </>,
                ]}
                image={IMAGES.handMeasure}
                imageAlt="손목 주름부터 가운뎃손가락 끝까지 자로 재는 방법"
              />
            </aside>
          </div>
        </section>
      ) : (
        <section id="P02-S02" className="container section section--last" aria-labelledby="s02-title">
          <div className="rec__result-head">
            <SectionHeader
              eyebrow={EYEBROWS.recommendResult}
              title="입력하신 조건에 맞는 추천 글러브"
              as="h1"
              size="display-lg"
              titleId="s02-title"
            />
            <ul className="rec__summary" aria-label="입력 요약">
              <li>{result.basis}</li>
              <li>{handText}</li>
              <li>{result.throwHand} 투구</li>
            </ul>
          </div>

          <article className="rec__card" data-theme="dark">
            <header className="rec__card-head">
              <h2 className="t-heading-sm">{result.product.name}</h2>
              <span className="t-heading-sm">{formatPrice(result.product.price)}</span>
            </header>
            <div className="rec__card-body">
              <div className="rec__card-img">
                <img src={result.product.image} alt={`${result.product.name} 이미지`} width="480" height="360" />
              </div>
              <div className="rec__card-info">
                <div className="rec__size">
                  <span className="t-eyebrow ink-muted">추천 크기</span>
                  <p className="t-heading">
                    {formatSize(result.size)} · {result.wear}
                  </p>
                </div>
                <span className="dash" aria-hidden="true" />
                <p className="t-body-sm ink-soft">
                  {result.basis} · 손 길이 {handText} · {result.throwHand} 투구 기준의 추천 예시입니다.
                  <br />
                  {result.product.resultDesc}
                  <br />
                  같은 손 길이여도 손 너비에 따라 착용감이 달라질 수 있습니다.
                </p>
                <div className="btn-row rec__btns">
                  <Button id="P02-S02-B02" onClick={addToCart}>
                    장바구니 담기
                  </Button>
                  <Button to={`/product/${result.product.id}`} variant="secondary" id="P02-S02-B01">
                    상품 상세 보기
                  </Button>
                  <Button variant="text" id="P02-S02-B03" onClick={again}>
                    다시 추천받기
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </main>
  )
}
