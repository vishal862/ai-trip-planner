import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTrip from "./components/createTrip";
import Home from "./components/Home";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./components/viewTrip/[tripId]";
import MyTrips from "./components/myTrips";
function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip/>}/>
          <Route path="/my-trips" element={<MyTrips/>}/>
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
