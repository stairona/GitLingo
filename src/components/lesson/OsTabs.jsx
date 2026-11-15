import { useState } from 'react'
import CodeText from './CodeText.jsx'
import './OsTabs.css'

// Windows / Mac / Linux tabs on a teaching card (Unit 1 Lesson 2, installing Git).
// Only the picked tab's text shows. Nothing here is tested, it's just reading.
function OsTabs({ tabs }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="os-tabs">
      <div className="os-tabs__list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={index === openIndex}
            className={`os-tabs__tab${index === openIndex ? ' os-tabs__tab--open' : ''}`}
            onClick={() => setOpenIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="os-tabs__panel" role="tabpanel">
        <CodeText text={tabs[openIndex].text} />
      </p>
    </div>
  )
}

export default OsTabs
