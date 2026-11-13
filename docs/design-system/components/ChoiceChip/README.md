# ChoiceChip

여러 선택지 중 하나만 고르는 칩 묶음입니다. 맞춤 추천의 사용할 사람·포지션·주로 던지는 손, 라인업의 포지션 필터, 결제 수단 타일에 씁니다.

- 소비자가 주는 것: 항목 이름(`legend`), 선택지 목록, 기본 선택값.
- 선택 안 됨: `field` 면 + 1px `line-strong`, 글자 `ink` 500. 선택됨: `fill` 면, `on-fill` 글자 700.
- 높이 `control-sm` 52px, 최소 너비 96~120px, `radius-sm`, 칩 사이 `space-8`.
- `fieldset` + `legend`로 묶고, 칩은 `button`의 `aria-pressed`로 상태를 알립니다.
- 선택 색에 `ember`를 쓰지 않습니다. ★ 색은 행동 버튼에만 남겨 둡니다.
- 늘 기본 선택값 하나가 골라진 상태로 엽니다.
