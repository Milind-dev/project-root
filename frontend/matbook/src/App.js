import './App.css';
import OnboardingDetails from './pages/OnboardingDetails';
// import OnboardingForm  from './pages/OnboardingForm';

function App() {
  // console.log(process.env)
  // console.log("processs", process.env.REACT_APP_API_URL);

  return (
    <div className="App">
      {/* <OnboardingForm /> */}
      <OnboardingDetails />
    </div>
  );
}

export default App;
