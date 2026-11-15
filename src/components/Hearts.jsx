import Icon from './Icon.jsx'
import './Hearts.css'

// Shows how many hearts are left in this lesson, like ♥ ♥ ♡.
// "count" is how many hearts are left, "total" is how many you started with.
// This component only draws hearts; the lesson screen keeps the actual number.
function Hearts({ count, total = 3 }) {
  // Make a list with one spot per heart: [0, 1, 2] when total is 3.
  const spots = Array.from({ length: total }, (_, index) => index)

  return (
    // Screen readers can't count icons, so the label says the number in words.
    <div className="hearts" aria-label={`${count} of ${total} hearts left`}>
      {spots.map((index) => (
        // Hearts are lost from the right, so spot 0 stays full the longest.
        <span key={index} className={index < count ? 'hearts__heart' : 'hearts__heart hearts__heart--lost'}>
          <Icon name="heart" size={24} />
        </span>
      ))}
    </div>
  )
}

export default Hearts
