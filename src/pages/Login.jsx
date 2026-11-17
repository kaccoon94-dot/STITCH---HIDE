import { useRef, useState } from 'react'
import Button from '../components/Button.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { Alert, Info } from '../components/Icons.jsx'
import './Login.css'

const FIELDS = [
  { name: 'email', label: '이메일', type: 'email', placeholder: '가입한 이메일을 입력해 주세요', autoComplete: 'username', inputMode: 'email' },
  { name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해 주세요', autoComplete: 'current-password' },
]

// 로그인 전 입력값 확인 규칙
function validate(values) {
  const errors = {}
  if (!values.email.trim()) errors.email = '이메일을 입력해 주세요.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = '이메일 형식을 확인해 주세요.'
  if (!values.password) errors.password = '비밀번호를 입력해 주세요.'
  return errors
}

// P07 로그인 — 화면만 있고 실제 로그인은 없습니다.
export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const formRef = useRef(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    setDone(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = FIELDS.find((f) => found[f.name])
    if (first) {
      formRef.current?.querySelector(`[name="${first.name}"]`)?.focus()
      setDone(false)
      return
    }
    setDone(true)
  }

  return (
    <main id="main" tabIndex={-1} className="page-light" data-theme="light">
      <section id="P07-S01" className="container section section--last" aria-labelledby="login-title">
        <SectionHeader eyebrow="LOGIN · 로그인" title={
            // 글자는 지우고 제목 한 줄 높이는 그대로 둡니다. 화면 낭독기에는 '로그인'으로 읽힙니다.
            <>
              {' '}
              <span className="visually-hidden">로그인</span>
            </>
          } as="h1" size="display-lg" titleId="login-title" />
        <form ref={formRef} className="form-panel login__panel" onSubmit={onSubmit} noValidate>
          {FIELDS.map((f) => (
            <div key={f.name} className="field">
              <label htmlFor={`login-${f.name}`} className="field__label">
                {f.label}
                <span className="field__req" aria-hidden="true">*</span>
                <span className="visually-hidden">(필수)</span>
              </label>
              <input
                id={`login-${f.name}`}
                className="input"
                name={f.name}
                type={f.type}
                value={values[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                inputMode={f.inputMode}
                required
                aria-invalid={errors[f.name] ? 'true' : undefined}
                aria-describedby={errors[f.name] ? `login-${f.name}-err` : undefined}
              />
              {errors[f.name] && (
                <p id={`login-${f.name}-err`} className="field__error">
                  <Alert />
                  {errors[f.name]}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" star large id="P07-S01-B01" className="login__submit">
            로그인
          </Button>

          <p className="login__notice t-body-sm ink-muted" role="status">
            {done && (
              <>
                <Info />
                로그인 기능은 아직 준비 중입니다.
              </>
            )}
          </p>
        </form>
      </section>
    </main>
  )
}
