import { useRef, useState } from 'react'
import Button from '../components/Button.jsx'
import ChoiceChips from '../components/ChoiceChips.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { Alert, Check, Info } from '../components/Icons.jsx'
import { useCart } from '../context/CartContext.jsx'
import { DELIVERY_REQUEST_OPTIONS, EYEBROWS, PAYMENT_OPTIONS } from '../data/options.js'
import { formatPrice, optionLabel } from '../data/products.js'
import './Checkout.css'

const FIELDS = [
  { name: 'receiver', label: '받는 사람', placeholder: '받는 분의 이름을 입력해 주세요', autoComplete: 'name' },
  { name: 'phone', label: '연락처', placeholder: '연락 가능한 휴대전화 번호를 입력해 주세요', autoComplete: 'tel', inputMode: 'tel' },
  { name: 'zip', label: '우편번호', placeholder: '우편번호 5자리', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5 },
  { name: 'address', label: '주소', placeholder: '도로명 또는 지번 주소를 입력해 주세요', autoComplete: 'address-line1' },
  { name: 'detail', label: '상세 주소', placeholder: '건물명, 동·호수 등 상세 주소를 입력해 주세요', autoComplete: 'address-line2' },
]

// [임시] 결제 전 입력값 확인 규칙
function validate(values) {
  const errors = {}
  if (!values.receiver.trim()) errors.receiver = '받는 분의 이름을 입력해 주세요.'
  const digits = values.phone.replace(/\D/g, '')
  if (!digits) errors.phone = '연락처를 입력해 주세요.'
  else if (digits.length < 10 || digits.length > 11) errors.phone = '휴대전화 번호 10~11자리를 확인해 주세요.'
  if (!/^\d{5}$/.test(values.zip)) errors.zip = '우편번호 5자리를 숫자로 입력해 주세요.'
  if (!values.address.trim()) errors.address = '주소를 입력해 주세요.'
  if (!values.detail.trim()) errors.detail = '상세 주소를 입력해 주세요.'
  return errors
}

// P06 결제 — 결제(S01~S03)와 주문 완료(S04)는 같은 주소 안에서 화면만 바꿉니다. 실제 결제는 없습니다.
export default function Checkout() {
  const cart = useCart()
  const [values, setValues] = useState({ receiver: '', phone: '', zip: '', address: '', detail: '', request: '' })
  const [errors, setErrors] = useState({})
  const [payment, setPayment] = useState('신용카드')
  const [order, setOrder] = useState(null)
  const formRef = useRef(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = FIELDS.find((f) => found[f.name])
    if (first) {
      formRef.current?.querySelector(`[name="${first.name}"]`)?.focus()
      return
    }
    // 주문 내용을 남겨 두고 장바구니를 비웁니다.
    setOrder({
      count: cart.count,
      total: cart.total,
      firstProductId: cart.lines[0]?.product.id,
    })
    cart.clear()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  if (order) return <OrderDone order={order} />

  const hasItems = cart.lines.length > 0
  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <main id="main" tabIndex={-1} className="page-light" data-theme="light">
      <form ref={formRef} onSubmit={onSubmit} noValidate>
        {/* P06-S01 배송 정보 */}
        <section id="P06-S01" className="container section" aria-labelledby="ship-title">
          <SectionHeader eyebrow={EYEBROWS.shipping} title="글러브를 받을 곳을 알려주세요" as="h1" size="display-lg" titleId="ship-title" />
          <div className="form-panel co__panel">
            <div className="co__grid">
              {FIELDS.map((f) => (
                <div key={f.name} className={`field co__field co__field--${f.name}`}>
                  <label htmlFor={`co-${f.name}`} className="field__label">
                    {f.label}
                  </label>
                  <input
                    id={`co-${f.name}`}
                    className="input"
                    name={f.name}
                    type="text"
                    value={values[f.name]}
                    onChange={onChange}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    inputMode={f.inputMode}
                    maxLength={f.maxLength}
                    required
                    aria-invalid={errors[f.name] ? 'true' : undefined}
                    aria-describedby={errors[f.name] ? `co-${f.name}-err` : undefined}
                  />
                  {errors[f.name] && (
                    <p id={`co-${f.name}-err`} className="field__error">
                      <Alert />
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}
              <div className="field co__field co__field--request">
                <label htmlFor="co-request" className="field__label">
                  배송 요청사항
                </label>
                <select
                  id="co-request"
                  name="request"
                  className={`select${values.request ? '' : ' select--placeholder'}`}
                  value={values.request}
                  onChange={onChange}
                >
                  <option value="">배송 요청사항을 선택해 주세요 (선택)</option>
                  {DELIVERY_REQUEST_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* P06-S02 결제 수단 */}
        <section id="P06-S02" className="container section" aria-labelledby="pay-title">
          <SectionHeader eyebrow={EYEBROWS.payment} title="결제 수단을 선택해 주세요" titleId="pay-title" />
          <div className="co__tiles">
            <ChoiceChips legend="결제 수단" hideLegend options={PAYMENT_OPTIONS} value={payment} onChange={setPayment} variant="tile" />
          </div>
        </section>

        {/* P06-S03 주문 요약 */}
        <section id="P06-S03" className="container section section--last" aria-labelledby="sum-title">
          <SectionHeader eyebrow={EYEBROWS.orderSummary} title="주문 상품과 금액을 확인해 주세요" titleId="sum-title" />
          <div className="summary-box co__summary">
            {hasItems ? (
              <ul className="co__items">
                {cart.lines.map((l) => (
                  <li key={l.key} className="co__item">
                    <img src={l.product.image} alt="" width="80" height="80" />
                    <div>
                      <p className="t-label">
                        {l.product.name} · {l.qty}개
                      </p>
                      <p className="t-body-sm ink-muted">{optionLabel(l.size, l.throwHand)}</p>
                    </div>
                    <p className="co__item-price">{formatPrice(l.lineTotal)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="t-body ink-soft co__empty">주문할 글러브가 없습니다. 장바구니에 글러브를 담아 주세요.</p>
            )}
            <dl className="summary-rows">
              <div className="summary-row">
                <dt>상품 금액</dt>
                <dd>{formatPrice(cart.subtotal)}</dd>
              </div>
              <div className="summary-row">
                <dt>배송비</dt>
                <dd>{formatPrice(cart.shipping)}</dd>
              </div>
              <div className="summary-row summary-row--total">
                <dt>최종 결제 금액</dt>
                <dd>{formatPrice(cart.total)}</dd>
              </div>
            </dl>
          </div>

          {errorCount > 0 && (
            <p className="field__error co__error" role="alert">
              <Alert />
              배송 정보 {errorCount}곳을 확인해 주세요.
            </p>
          )}

          <div className="btn-row co__pay">
            {hasItems ? (
              <Button type="submit" id="P06-S03-B01">
                {formatPrice(cart.total)} 결제하기
              </Button>
            ) : (
              <Button to="/lineup" variant="secondary">
                라인업 보기
              </Button>
            )}
          </div>
        </section>
      </form>
    </main>
  )
}

// P06-S04 주문 완료 (dark)
function OrderDone({ order }) {
  return (
    <main id="main" tabIndex={-1} className="co-done" data-theme="dark">
      <section id="P06-S04" className="container co-done__inner" aria-labelledby="done-title">
        <span className="co-done__icon" aria-hidden="true">
          <Check />
        </span>
        <h1 id="done-title" className="t-display-lg">
          주문과 결제가 완료되었습니다
        </h1>
        <p className="t-body ink-soft">
          글러브 {order.count}개 · 결제 금액 {formatPrice(order.total)}
          <br />
          받는 분과 배송지 정보를 다시 한번 확인해 주세요.
        </p>
        <div className="co-done__care">
          <span className="co-done__care-head">
            <Info />
            관리법 안내
          </span>
          <p>
            새 글러브는 사용 전 착용감과 끈의 상태를 확인해 주세요.
            <br />
            사용 후에는 먼지와 물기를 닦고 그늘에서 말려 주세요.
          </p>
        </div>
        <div className="btn-row co-done__btns">
          <Button to={`/product/${order.firstProductId}#care`} id="P06-S04-B01">
            관리법 보기
          </Button>
          <Button to="/" variant="secondary" id="P06-S04-B02">
            메인으로
          </Button>
        </div>
      </section>
    </main>
  )
}
