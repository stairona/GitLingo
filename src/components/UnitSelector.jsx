import Icon from './Icon.jsx'
import { units } from '../content/index.js'
import { countFinished, isUnitUnlocked, getCurrentUnitIndex } from '../utils/unitProgress.js'
import './UnitSelector.css'

function UnitSelector({ completedLessons }) {
  const currentIndex = getCurrentUnitIndex(completedLessons)

  function scrollToUnit(unitId) {
    document.getElementById(unitId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="unit-selector">
      <span className="unit-selector__label">Units</span>
      <ul className="unit-selector__list">
        {units.map((unit, index) => {
          const unlocked = isUnitUnlocked(index, completedLessons)
          const isCurrent = index === currentIndex
          const finished = countFinished(unit, completedLessons)

          return (
            <li key={unit.id}>
              <button
                className={`unit-selector__item${isCurrent ? ' unit-selector__item--current' : ''}${unlocked ? '' : ' unit-selector__item--locked'}`}
                onClick={() => scrollToUnit(unit.id)}
              >
                <span className="unit-selector__number">{unit.number}</span>
                <span className="unit-selector__title">{unit.title}</span>
                <span className="unit-selector__status">
                  {unlocked ? `${finished}/${unit.lessons.length}` : <Icon name="lock" size={16} />}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UnitSelector
