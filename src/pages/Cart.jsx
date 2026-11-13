import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Stepper from '../components/Stepper.jsx'
import { useCart } from '../context/CartContext.jsx'
import { EYEBROWS } from '../data/options.js'
import { formatPrice, optionLabel } from '../data/products.js'
import './Cart.css'

// P05 장바구니
export default function Cart() {
  const { lines, count, subtotal, shipping, total, setQty, removeItem } = useCart()

  return (
    <main id="main" tabIndex={-1} className="page-light" data-theme="light">
      {/* P05-S01 담은 글러브 목록 */}
      <section id="P05-S01" className="container section" aria-labelledby="cart-title">
        <SectionHeader eyebrow={EYEBROWS.cart} title={`장바구니 · 글러브 ${count}개`} as="h1" size="display-lg" titleId="cart-title" />

        {lines.length === 0 ? (
          <div className="cart__empty">
            <p className="t-body ink-soft">장바구니에 담은 글러브가 없습니다.</p>
          </div>
        ) : (
          <ul className="cart__list">
            {lines.map((l) => (
              <li key={l.key} className="cart__row">
                <Link to={`/product/${l.product.id}`} className="cart__img" tabIndex={-1} aria-hidden="true">
                  <img src={l.product.image} alt="" width="120" height="120" />
                </Link>
                <div className="cart__name">
                  <Link to={`/product/${l.product.id}`} className="t-label cart__link">
                    {l.product.name}
                  </Link>
                  <p className="t-body-sm ink-muted">{optionLabel(l.size, l.throwHand)}</p>
                </div>
                <div className="cart__qty">
                  <Stepper value={l.qty} onChange={(q) => setQty(l.key, q)} label={`${l.product.name} 수량`} />
                </div>
                <p className="cart__price">{formatPrice(l.lineTotal)}</p>
                <Button
                  variant="text"
                  id="P05-S01-B01"
                  className="cart__remove"
                  onClick={() => removeItem(l.key)}
                  aria-label={`${l.product.name} 삭제`}
                >
                  삭제
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* P05-S02 주문 금액 요약 */}
      <section id="P05-S02" className="container section section--last" aria-labelledby="cart-sum-title">
        <h2 id="cart-sum-title" className="visually-hidden">
          주문 금액 요약
        </h2>
        <div className="cart__summary">
          <div className="summary-box">
            <dl className="summary-rows">
              <div className="summary-row">
                <dt>상품 금액</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="summary-row">
                <dt>배송비</dt>
                <dd>{formatPrice(shipping)}</dd>
              </div>
              <div className="summary-row summary-row--total">
                <dt>총 결제 금액</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
          <div className="btn-row cart__btns">
            {lines.length > 0 ? (
              <Button to="/checkout" id="P05-S02-B01">
                주문하기
              </Button>
            ) : (
              <Button id="P05-S02-B01" disabled>
                주문하기
              </Button>
            )}
            <Button to="/lineup" variant="secondary" id="P05-S02-B02">
              계속 둘러보기
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
