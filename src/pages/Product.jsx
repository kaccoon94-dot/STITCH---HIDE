import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import ChoiceChips from '../components/ChoiceChips.jsx'
import HelpBox from '../components/HelpBox.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Stepper from '../components/Stepper.jsx'
import { useCart } from '../context/CartContext.jsx'
import { IMAGES } from '../data/images.js'
import { EYEBROWS, THROW_OPTIONS } from '../data/options.js'
import { formatPrice, formatSize, getProduct, sizeOptions } from '../data/products.js'
import './Product.css'

// 돋보기 배율
const LENS_ZOOM = 2.5

const CARE_STEPS = [
  {
    title: '01. 먼지와 물기 닦기',
    lines: ['마른 부드러운 천으로 가볍게 닦아 주세요.', '물에 담그거나 세탁기로 세척하지 마세요.'],
    alt: '마른 천으로 글러브를 닦는 손',
  },
  {
    title: '02. 그늘에서 충분히 건조',
    lines: ['젖었다면 통풍이 잘되는 그늘에서 말려 주세요.', '직사광선·드라이어·난방기 열은 피하세요.'],
    alt: '그늘에서 말리는 글러브',
  },
  {
    title: '03. 형태를 유지해 보관',
    lines: ['포구부에 공을 넣어 형태를 잡아 주세요.', '무거운 물건에 눌리지 않게 보관하세요.'],
    alt: '포구부에 공을 넣어 보관하는 글러브',
  },
]

// P04 상품 상세
export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  if (!product) return <NotFound />
  // 상품이 바뀌면 선택 상태를 새로 시작합니다.
  return <ProductDetail key={product.id} product={product} />
}

function ProductDetail({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const gallery = IMAGES.detailGallery

  const [mainIndex, setMainIndex] = useState(0)
  const [size, setSize] = useState(product.size)
  const [throwHand, setThrowHand] = useState('오른손')
  const [qty, setQty] = useState(1)

  const thumbs = gallery.map((src, i) => ({ src, i })).filter((t) => t.i !== mainIndex)

  const addToCart = () => {
    addItem({ productId: product.id, size, throwHand, qty })
    navigate('/cart')
  }

  // 돋보기: 마우스가 올라간 부분만 동그랗게 확대 (사용자 요청 2026-11-13)
  const lensRef = useRef(null)
  const moveLens = (e) => {
    const lens = lensRef.current
    if (!lens) return
    const box = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - box.left
    const y = e.clientY - box.top
    const r = lens.offsetWidth / 2
    lens.style.left = `${x}px`
    lens.style.top = `${y}px`
    lens.style.backgroundSize = `${box.width * LENS_ZOOM}px ${box.height * LENS_ZOOM}px`
    lens.style.backgroundPosition = `${r - x * LENS_ZOOM}px ${r - y * LENS_ZOOM}px`
  }

  return (
    <main id="main" tabIndex={-1} className="page-light" data-theme="light">
      {/* P04-S01 상세 스펙 */}
      <section id="P04-S01" className="container section" aria-labelledby="pd-title">
        <div className="pd__top">
          <div className="pd__gallery">
            <div className="pd__main" onMouseMove={moveLens}>
              <img
                key={mainIndex}
                src={gallery[mainIndex]}
                alt={`${product.name} 대표 이미지 ${mainIndex + 1}`}
                width="640"
                height="480"
              />
              <span
                ref={lensRef}
                className="pd__lens"
                aria-hidden="true"
                style={{ backgroundImage: `url("${gallery[mainIndex]}")` }}
              />
            </div>
            <ul className="pd__thumbs" aria-label="다른 이미지 보기">
              {thumbs.map((t) => (
                <li key={t.i}>
                  <button type="button" onClick={() => setMainIndex(t.i)} aria-label={`이미지 ${t.i + 1} 크게 보기`}>
                    <img src={t.src} alt="" width="148" height="110" loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pd__info">
            <h1 id="pd-title" className="t-display-lg">
              {product.nameLines[0]}
              <br />
              {product.nameLines[1]}
            </h1>
            <p className="t-heading-sm pd__price">{formatPrice(product.price)}</p>
            <p className="t-body ink-soft">
              {product.detailDesc}
              <br />
              포지션과 손 크기에 맞는 옵션을 확인해 주세요.
            </p>

            <div className="pd__options">
              <div className="field">
                <label htmlFor="pd-size" className="field__label">
                  사이즈
                </label>
                <select id="pd-size" className="select" value={size} onChange={(e) => setSize(parseFloat(e.target.value))}>
                  {sizeOptions(product).map((s) => (
                    <option key={s} value={s}>
                      {formatSize(s)}
                    </option>
                  ))}
                </select>
              </div>
              <ChoiceChips legend="주로 던지는 손" options={THROW_OPTIONS} value={throwHand} onChange={setThrowHand} wide />
              <div className="field">
                <span className="field__label" id="pd-qty-label">
                  수량
                </span>
                <Stepper value={qty} onChange={setQty} />
              </div>
            </div>

            <div className="btn-row pd__btns">
              <Button id="P04-S01-B01" onClick={addToCart}>
                장바구니 담기
              </Button>
              <Button to="/recommend" variant="text" star id="P04-S01-B02">
                내게 맞는지 추천받기
              </Button>
            </div>
          </div>
        </div>

        <div className="pd__bottom">
          <table className="spec">
            <caption className="visually-hidden">{product.name} 상세 스펙</caption>
            <tbody>
              <SpecRow label="가죽" main={product.leather} note="가죽의 결·색상은 제품마다 다를 수 있습니다." />
              <SpecRow
                label="제작"
                main="가죽 패널 봉제 및 끈 조립"
                note="사용 전 연결 부위와 끈의 상태를 확인해 주세요."
              />
              <SpecRow
                label="크기 (인치)"
                main={`${formatSize(product.size)} · ${product.usage}`}
                note="표기 크기는 글러브의 길이 기준입니다."
              />
              <SpecRow label="무게" main={product.weight} note="측정 방식에 따라 차이가 있을 수 있습니다." />
              <SpecRow
                label="안전·내구성"
                main="사용 전 봉제선·끈의 풀림을 확인해 주세요."
                note="손상된 부분이 있으면 사용을 멈춰 주세요."
              />
              <SpecRow label="사이즈 정보" main="오른손 투구용: 왼손 착용" note="왼손 투구용: 오른손 착용" />
            </tbody>
          </table>
          <HelpBox
            items={[
              <>
                <strong>인치</strong>는 글러브의 크기를 나타내는 단위입니다.
              </>,
              '투구하는 손과 글러브를 끼는 손은 반대입니다.',
              <>
                손 길이만으로 착용감을 확정하기 어려우므로
                <br />
                손 너비와 선호하는 조임도 함께 확인해 주세요.
              </>,
            ]}
          />
        </div>
      </section>

      {/* P04-S02 관리법 */}
      <section id="care" className="container section section--last" aria-labelledby="care-title">
        <SectionHeader
          eyebrow={EYEBROWS.care}
          title="오래 함께 쓰는 글러브 관리법"
          titleId="care-title"
          aside="사용 후 물기와 먼지를 정리하고, 형태를 지켜 보관해 주세요."
        />
        <ol className="care__list">
          {CARE_STEPS.map((step, i) => (
            <li key={step.title} className="care__card">
              <img src={IMAGES.care[i]} alt={step.alt} width="384" height="220" loading="lazy" />
              <div className="care__text">
                <h3 className="t-cell-title">{step.title}</h3>
                <p className="t-body-sm ink-soft">
                  {step.lines[0]}
                  <br />
                  {step.lines[1]}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="btn-row care__btns">
          <Button id="P04-S02-B01" onClick={addToCart}>
            장바구니 담기
          </Button>
        </div>
      </section>
    </main>
  )
}

function SpecRow({ label, main, note }) {
  return (
    <tr>
      <th scope="row">{label}</th>
      <td>
        <span className="spec__main">{main}</span>
        <span className="spec__note">{note}</span>
      </td>
    </tr>
  )
}

function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page-light" data-theme="light">
      <section className="container section section--last">
        <SectionHeader title="상품을 찾을 수 없습니다" as="h1" size="display-lg" lead="라인업에서 다시 골라 주세요." />
        <div className="btn-row" style={{ marginTop: 'var(--space-32)' }}>
          <Button to="/lineup">라인업 보기</Button>
        </div>
      </section>
    </main>
  )
}
