import { useState } from 'react'
import { copyText } from '../../utils/copyText.js'
import './ProfileCard.css'

// One info row. Fields marked copyable (like Lily's long GitHub URL) get a Copy button,
// because on GitHub you copy your repo's address instead of typing it out.
function ProfileField({ field }) {
  // 'idle', 'copied' or 'failed'
  const [copyState, setCopyState] = useState('idle')

  async function handleCopy() {
    const worked = await copyText(field.value)
    setCopyState(worked ? 'copied' : 'failed')
    setTimeout(() => setCopyState('idle'), 2000)
  }

  return (
    <div className="profile-card__field">
      <dt>{field.label}</dt>
      <dd>{field.value}</dd>
      {field.copyable && (
        <button className={`profile-card__copy profile-card__copy--${copyState}`} onClick={handleCopy}>
          {copyState === 'copied' ? '✓ Copied!' : copyState === 'failed' ? "Couldn't copy" : 'Copy'}
        </button>
      )}
    </div>
  )
}

// The card beside every question in a lesson with a demo user, so the exact name,
// email, commit message or URL you need is always on screen.
function ProfileCard({ user }) {
  return (
    <aside className="profile-card">
      <span className="profile-card__label">You are</span>
      <h2 className="profile-card__name">{user.name}</h2>
      <dl className="profile-card__fields">
        {user.fields.map((field) => (
          <ProfileField key={field.label} field={field} />
        ))}
      </dl>
    </aside>
  )
}

export default ProfileCard
