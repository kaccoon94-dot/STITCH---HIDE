import Button from '../components/Button.jsx'
import FloatingButtons from '../components/FloatingButtons.jsx'
import { IMAGES } from '../data/images.js'
import useReveal from '../hooks/useReveal.js'
import './Home.css'

// P01 메인
export default function Home() {
  const storyRef = useReveal()

  return (
    <main id="main" tabIndex={-1} className="home" data-theme="dark">
      {/* P01-S01 첫 화면 */}
      <section id="P01-S01" className="hero" aria-labelledby="hero-title">
        <img className="hero__bg" src={IMAGES.heroBg} alt="" aria-hidden="true" fetchPriority="high" />
        <div className="hero__content">
          <h1 id="hero-title" className="t-display-xl hero__in hero__in--1">
            한 땀의 바느질과 엄선한 가죽으로,
            <br />
            손에 길들수록 깊어지는 글러브를 만듭니다
          </h1>
          <span className="dash dash--lg hero__dash hero__in hero__in--2" aria-hidden="true" />
          <p className="t-body-lg ink-soft hero__in hero__in--2">
            포지션과 손 길이, 주로 던지는 손만 고르면
            <br />
            내 손에 맞는 글러브 크기와 모델을 추천해 드립니다.
          </p>
          <Button to="/recommend" star glow large arrow id="P01-S01-B01" className="hero__cta hero__in hero__in--3">
            맞춤 추천 시작하기
          </Button>
        </div>
      </section>

      {/* P01-S02 브랜드 스토리 */}
      <section id="brand-story" className="story" aria-labelledby="story-title" ref={storyRef}>
        <h2 id="story-title" className="t-display-wide story__title">
          BRAND STORY
        </h2>
        <p className="t-body ink-muted story__sub">손에 길들수록 깊어지는 글러브, 그 시작을 소개합니다</p>

        <div className="story__grid">
          <div className="story__cell story__cell--img reveal">
            <img src={IMAGES.storyLeather} alt="가죽을 바느질하는 손과 도구" loading="lazy" />
          </div>
          <div className="story__cell story__cell--text reveal">
            <p className="t-cell-title">
              가죽의 질을 직접 확인하고,
              <br />
              부위마다 알맞은 쓰임을 정합니다
            </p>
            <span className="dash story__dash" aria-hidden="true" />
            <p className="t-body-sm ink-soft">
              재단부터 봉제, 끈 조립, 형태 잡기까지
              <br />
              한 단계씩 손으로 확인하며 완성합니다.
            </p>
          </div>
          <div className="story__cell story__cell--text story__cell--maker reveal">
            <p className="t-body ink-soft">
              사회인 야구 선수들의 손을
              <br />
              오래 지켜본 장인
            </p>
            <span className="dash story__dash" aria-hidden="true" />
            <p className="t-display-lg">STITCH &amp; HIDE 공방</p>
            <p className="t-menu ink-muted story__role">글러브 제작 장인</p>
          </div>
          <div className="story__cell story__cell--img reveal">
            <img src={IMAGES.storyCraftsman} alt="공방에서 글러브를 다듬는 장인" loading="lazy" />
          </div>
        </div>

        <p className="t-heading story__closing">
          처음 끼는 날보다
          <br />
          백 번째 경기에서 더 편한 글러브
        </p>
        <span className="dash dash--lg story__closing-dash" aria-hidden="true" />
        <p className="t-body ink-soft">
          글러브를 바꾸려는 경력자부터 입문자, 아이의 첫 글러브까지
          <br />
          각자의 손에 맞는 크기를 함께 찾아 드립니다.
        </p>
        <div className="btn-row story__btns">
          <Button to="/recommend" star arrow id="P01-S02-B01">
            나에게 맞는 글러브 찾기
          </Button>
          <Button to="/lineup" variant="secondary" id="P01-S02-B02">
            라인업 보기
          </Button>
        </div>
      </section>

      <FloatingButtons />
    </main>
  )
}
