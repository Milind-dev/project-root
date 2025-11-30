import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import OnboardingForm from "./pages/OnboardingForm";
import OnboardingDetails from "./pages/OnboardingDetails";

function App() {
  return (
    <div className="App">
      <nav className="p-4 border-b mb-6">
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/onboarding" className="mr-4">
          Onboarding
        </Link>
        <Link to="/details">Details</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/details" element={<OnboardingDetails />} />
      </Routes>
    </div>
  );
}

export default App;
