import Sidebar from './Sidebar.jsx'
import RightPanel from './RightPanel.jsx'
import './AppFrame.css'

// The 3-column layout around every main page: sidebar, page, right panel.
// `children` is whatever page we put inside, like <Home />.
function AppFrame({ children, finishedCount, totalCount }) {
  return (
    <div className="app-frame">
      <Sidebar />
      <main className="app-frame__main">{children}</main>
      <RightPanel finishedCount={finishedCount} totalCount={totalCount} />
    </div>
  )
}

export default AppFrame
