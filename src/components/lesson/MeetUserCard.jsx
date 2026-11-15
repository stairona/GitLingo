import PixelCharacter from '../characters/PixelCharacter.jsx'
import CodeText from './CodeText.jsx'
import { CHARACTERS } from '../../content/characters.js'
import './MeetUserCard.css'

// "Jackson Stark" -> "jackson", the key of their sprite in characters.js
function characterIdFor(user) {
  return user.name.split(' ')[0].toLowerCase()
}

// The first screen of a lesson with a demo user: who you'll be typing as, and their info.
// Units 2 and 3 have their own titles (welcomeTitle, like "Charley's back!").
// Unit 1 doesn't, so it says "Meet Jackson Stark".
function MeetUserCard({ user }) {
  const id = characterIdFor(user)
  const firstName = user.name.split(' ')[0]

  return (
    <article className="meet-user">
      <div className="meet-user__intro">
        <div className="meet-user__text">
          <span className="meet-user__label">Meet your user</span>
          <h1 className="meet-user__title">{user.welcomeTitle ?? `Meet ${user.name}`}</h1>
          <p className="meet-user__story">
            <CodeText text={user.backstory} />
          </p>
        </div>
        {CHARACTERS[id] && (
          <div className="meet-user__avatar">
            <PixelCharacter id={id} />
          </div>
        )}
      </div>

      <dl className="meet-user__fields">
        {user.fields.map((field) => (
          <div key={field.label} className="meet-user__field">
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>

      <p className="meet-user__as">You'll be typing commands as {firstName}.</p>
    </article>
  )
}

export default MeetUserCard
