import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import SpotNew from "./pages/spots/new"
import SpotShow from "./pages/spots/show"
import SpotEdit from "./pages/spots/edit"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<SpotNew />} />
            <Route path="/:id" element={<SpotShow />} />
            <Route path="/edit/:id" element={<SpotEdit />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
