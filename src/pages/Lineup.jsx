import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import ChoiceChips from '../components/ChoiceChips.jsx'
import ModelCard from '../components/ModelCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { EYEBROWS, LINEUP_FILTERS } from '../data/options.js'
import { formatPrice, formatSize, getProduct, PRODUCTS } from '../data/products.js'
import './Lineup.css'

const MAX_COMPARE = 3

// P03 라인업
export default function Lineup() {
  const [filter, setFilter] = useState('전체')
  const [compareIds, setCompareIds] = useState([])
  const [pulse, setPulse] = useState(0)

  const visible = filter === '전체' ? PRODUCTS : PRODUCTS.filter((p) => p.filter === filter)
  const full = compareIds.length >= MAX_COMPARE
  const compared = compareIds.map(getProduct)

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((x) => x !== id))
    } else if (compareIds.length < MAX_COMPARE) {
      setCompareIds([...compareIds, id])
    } else {
      return
    }
    // 담은 개수가 바뀌면 n/3 숫자를 짧게 강조
    setPulse((n) => n + 1)
  }

  const countText = `${compareIds.length}/${MAX_COMPARE}`

  return (
    <main id="main" tabIndex={-1} className="page-light lineup" data-theme="light">
      {/* P03-S01 모델 목록 */}
      <section id="P03-S01" className="container section" aria-labelledby="lineup-title">
        <SectionHeader
          eyebrow={EYEBROWS.lineup}
          title="포지션에 맞는 글러브를 만나보세요"
          as="h1"
          size="display-lg"
          titleId="lineup-title"
          aside="포지션별 모델을 둘러보고, 관심 있는 글러브를 최대 3개까지 비교해 보세요."
        />

        <div className="lineup__filter">
          <ChoiceChips legend="포지션 필터" options={LINEUP_FILTERS} value={filter} onChange={setFilter} />
        </div>

        <div className="lineup__info">
          <div className="lineup__price-box">
            <p className="t-body-sm ink-soft">
              예시 라인업은 129,000원부터 249,000원까지.
              <br />
              가격과 함께 크기·소재·착용감을 살펴보세요.
            </p>
          </div>
          <div className="lineup__banner">
            <p className="t-body-sm">
              <strong>어떤 글러브가 맞을지 고민되나요?</strong>
              <br />
              <span className="ink-soft">포지션과 손 길이로 추천받아 보세요.</span>
            </p>
            <Button to="/recommend" star arrow id="P03-S01-B02">
              맞춤 추천 받기
            </Button>
          </div>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {filter} 모델 {visible.length}개
        </p>
        <div className="lineup__grid">
          {visible.map((p) => (
            <ModelCard
              key={p.id}
              product={p}
              compared={compareIds.includes(p.id)}
              compareDisabled={full && !compareIds.includes(p.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
        {full && (
          <p className="lineup__limit t-caption ink-muted" role="status">
            비교는 최대 3개까지 담을 수 있습니다. 다른 모델을 담으려면 담은 모델 하나를 빼 주세요.
          </p>
        )}
      </section>

      {/* P03-S02 모델 비교 */}
      <section id="compare" className="container section section--last" aria-labelledby="compare-title">
        <SectionHeader
          eyebrow={EYEBROWS.compare}
          title="관심 있는 글러브를 한눈에 비교하세요"
          titleId="compare-title"
          aside={
            <>
              비교 담기{' '}
              <strong key={pulse} className="lineup__count" aria-live="polite">
                {countText}
              </strong>{' '}
              · 가격·소재·크기·추천 포지션·무게를 비교해 보세요.
            </>
          }
        />

        {compared.length === 0 ? (
          <div className="lineup__empty">
            <p className="t-body-sm ink-soft">위 모델 카드에서 &lsquo;비교 담기&rsquo;를 선택하면 이곳에 비교 표가 나타납니다.</p>
          </div>
        ) : (
          <div className="lineup__table-wrap">
            <table className="cmp">
              <caption className="visually-hidden">담은 모델 비교 표</caption>
              <thead>
                <tr>
                  <th scope="col" className="cmp__corner">
                    항목
                  </th>
                  {compared.map((p) => (
                    <th key={p.id} scope="col">
                      <img src={p.image} alt="" width="200" height="140" />
                      <span className="t-label">{p.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">가격</th>
                  {compared.map((p) => (
                    <td key={p.id}>{formatPrice(p.price)}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">가죽</th>
                  {compared.map((p) => (
                    <td key={p.id}>{p.leather}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">크기 (인치)</th>
                  {compared.map((p) => (
                    <td key={p.id}>{formatSize(p.size)}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">추천 포지션</th>
                  {compared.map((p) => (
                    <td key={p.id}>{p.recommendPosition}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">무게</th>
                  {compared.map((p) => (
                    <td key={p.id}>{p.weight}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">상품 확인</th>
                  {compared.map((p) => (
                    <td key={p.id}>
                      <Button to={`/product/${p.id}`} variant="secondary" id="P03-S02-B01" className="cmp__btn">
                        상세 보기
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 모바일: 화면 아래 비교 막대 */}
      {compareIds.length > 0 && (
        <div className="lineup__bar" data-theme="dark">
          <span>
            비교 담기 <strong>{countText}</strong>
          </span>
          <Link to="#compare" className="lineup__bar-link">
            비교 보기
          </Link>
        </div>
      )}
    </main>
  )
}
