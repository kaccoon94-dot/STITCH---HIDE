# TextCell

지그재그 격자의 글 칸입니다. 이미지 칸과 짝을 지어 2열로 붙입니다(P01-S02 브랜드 스토리).

- 칸 560×400, 칸 사이 여백 없이 1px `line`으로만 나눕니다. 줄마다 이미지와 글 칸의 좌우를 바꿉니다.
- 글 칸: `surface-raised`, 좌우 안쪽 `space-56`, 가운데 정렬.
- 내용 단위: 제목 2줄(`cell-title`) → 대시 24px(`dash`, 위아래 28px) → 본문 2줄(`body-sm` `ink-soft`).
- 장인 칸 변형: 위 소개 2줄(`body` `ink-soft`) → 대시 → 큰 이름(`display-lg`) → 직함(`menu` `ink-muted`).
- 이미지 칸은 `ImageSlot`, 모서리 `radius-none`.
