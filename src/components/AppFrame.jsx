import Sidebar from './Sidebar.jsx'
import RightPanel from './RightPanel.jsx'
import './AppFrame.css'

// The layout around every main page: sidebar on the left, then the page and
// the right panel sitting side by side, centered in the space that's left.
// `children` is whatever page we put inside, like <Home />.
function AppFrame({ children, finishedCount, totalCount }) {
  return (
    <div className="app-frame">
      <Sidebar />
      <div className="app-frame__body">
        <main className="app-frame__main">{children}</main>
        <RightPanel finishedCount={finishedCount} totalCount={totalCount} />
      </div>
    </div>
  )
}

export default AppFrame
