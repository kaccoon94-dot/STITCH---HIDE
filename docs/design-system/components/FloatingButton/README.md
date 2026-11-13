# FloatingButton

메인(P01)에만 오른쪽 아래에 고정되는 동그란 버튼 두 개입니다.

- F-01 '추천'(★): `ember` / `on-ember`, 별 아이콘 + 글자. 와이어프레임의 '흰색'을 ★ 색 규칙에 맞춰 엠버로 바꾼 제안입니다(확정 필요).
- F-02 'TOP': `surface-sunken` + 1px `line-strong` 테두리, 위 화살표 + 글자.
- 지름 `float-size` 64px, `radius-full`, `shadow-float`. 화면 가장자리에서 32px, 버튼 사이 `space-12`. 추천이 위, TOP이 아래.
- 아이콘만 두지 않고 늘 글자를 함께 씁니다. `aria-label`도 붙입니다.
- 다른 페이지에는 두지 않습니다.
