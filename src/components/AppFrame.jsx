import Sidebar from './Sidebar.jsx'
import RightPanel from './RightPanel.jsx'
import './AppFrame.css'

function AppFrame({ children, completedLessons }) {
  return (
    <div className="app-frame">
      <Sidebar completedLessons={completedLessons} />
      <div className="app-frame__body">
        <main className="app-frame__main">{children}</main>
        <RightPanel completedLessons={completedLessons} />
      </div>
    </div>
  )
}

export default AppFrame
