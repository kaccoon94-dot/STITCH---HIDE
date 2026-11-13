import './SectionHeader.css'

/**
 * 왼쪽형 섹션 머리 (P02~P06): 짧은 선 + 라벨 → 제목, 선택적으로 아래 본문 / 오른쪽 짧은 설명
 */
export default function SectionHeader({ eyebrow, title, as: Tag = 'h2', size = 'heading', lead, aside, titleId, children }) {
  return (
    <div className={`sh${aside ? ' sh--aside' : ''}`}>
      <div className="sh__main">
        {eyebrow && (
          <span className="sh__eyebrow t-eyebrow">
            <span className="sh__rule" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <Tag id={titleId} className={`t-${size}`}>
          {title}
        </Tag>
        {lead && <p className="t-body ink-muted">{lead}</p>}
      </div>
      {aside && <p className="sh__aside t-body-sm ink-muted">{aside}</p>}
      {children}
    </div>
  )
}
