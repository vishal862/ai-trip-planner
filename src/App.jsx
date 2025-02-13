import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import CreateTrip from "./components/createTrip"
import Home from "./components/Home"
import Header from "./components/custom/Header"
import { Toaster } from "./components/ui/toaster"
function App() {

  return (
    <Router>
      <Header/>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-trip" element={<CreateTrip/>}/>
      </Routes>
    </Router>
  )
}

export default App
