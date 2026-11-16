import { useCallback, useEffect, useState } from 'react'

// 사이트 전체 화면 모드: 'dark'(다크) / 'light'(화이트)
// 처음 방문하면 기기 설정(prefers-color-scheme)을 따르고, 버튼으로 바꾸면 기억합니다.
// 첫 화면 깜빡임을 막기 위한 초기값은 index.html의 인라인 스크립트가 먼저 정합니다.
const KEY = 'sh-color-mode'

function readSaved() {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

function systemMode() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function useColorMode() {
  const [mode, setMode] = useState(
    () => document.documentElement.dataset.mode || readSaved() || systemMode(),
  )

  useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  // 직접 고른 적이 없으면 기기 설정이 바뀔 때 따라갑니다.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (!readSaved()) setMode(mq.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(KEY, next)
      } catch {
        /* 저장이 막혀 있어도 이번 방문 동안은 동작 */
      }
      return next
    })
  }, [])

  return [mode, toggle]
}
