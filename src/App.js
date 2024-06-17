import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Onboarding from "./pages/onboarding/onboarding";
import ProgressTracker from "./pages/homePages/progressTracker";
import { AuthContextProvider } from "./context/authContext";
import DailyMotivation from "./pages/homePages/dailyMotivations";
import Resources from "./pages/homePages/resources";
import Feedback from "./pages/homePages/feedback";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <ProgressTracker />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route
              path="/motivations"
              element={
                <Layout>
                  <DailyMotivation />
                </Layout>
              }
            />
            <Route
              path="/resources"
              element={
                <Layout>
                  <Resources />
                </Layout>
              }
            />
            <Route
              path="/feedback"
              element={
                <Layout>
                  <Feedback />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
