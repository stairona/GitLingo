import CodeText from './CodeText.jsx'
import Diagram from './Diagram.jsx'
import OsTabs from './OsTabs.jsx'
import './TeachingCard.css'

// One teaching card from a lesson file. Every part except the title is optional:
// some cards only have bullets (Unit 1 Lesson 3, card 4), some have a diagram.
function TeachingCard({ card }) {
  const { title, body = [], diagram, tabs, bullets = [], footer } = card

  return (
    <article className="teaching-card">
      <h1 className="teaching-card__title">
        <CodeText text={title} />
      </h1>

      {body.map((paragraph, index) => (
        <p key={index} className="teaching-card__text">
          <CodeText text={paragraph} />
        </p>
      ))}

      {diagram && <Diagram text={diagram} />}

      {tabs && <OsTabs tabs={tabs} />}

      {bullets.length > 0 && (
        <ul className="teaching-card__bullets">
          {bullets.map((bullet, index) => (
            <li key={index}>
              <CodeText text={bullet} />
            </li>
          ))}
        </ul>
      )}

      {footer && (
        <p className="teaching-card__footer">
          <CodeText text={footer} />
        </p>
      )}
    </article>
  )
}

export default TeachingCard
