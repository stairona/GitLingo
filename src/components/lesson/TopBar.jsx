import Hearts from './Hearts.jsx'
import Icon from '../Icon.jsx'
import './TopBar.css'

// The bar at the top of every lesson screen: quit, how far you are, hearts left.
// progress is a number from 0 to 1. In review mode a Review label takes the hearts' place.
function TopBar({ progress, hearts, review = false, onQuit }) {
  const percent = Math.round(progress * 100)

  return (
    <header className="top-bar">
      <button className="top-bar__quit" onClick={onQuit} aria-label="Quit the lesson and go back to the map">
        <Icon name="close" size={22} />
      </button>
      <div className="top-bar__progress" aria-label={`${percent}% of the lesson done`}>
        <div className="top-bar__fill" style={{ width: `${percent}%` }} />
      </div>
      {review ? <span className="top-bar__review">Review</span> : <Hearts count={hearts} />}
    </header>
  )
}

export default TopBar
