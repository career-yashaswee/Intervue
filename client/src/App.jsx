import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./authentication/log-in";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import Scenario from "./dashboard/scenario/Scenario";
import Interview from "./dashboard/interview/Interview";
import SignUp from "./authentication/sign-up";
import Error from "./components/Error";
import { Setting } from "./dashboard/setting/Setting";
import InterviewSession from "./dashboard/session/Session";
import { NetworkStatusProvider } from "./context/NetworkStatusContext";
import { Toaster } from "sonner";
import NetworkStatusHandler from "./helpers/NetworkStatusHandler";
import InputOTPForm from "./authentication/otp-input";
import { ThemeProvider } from "@/components/theme-provider";
import useSessionManager from "./clientSession/SessionManager";
import SessionExpiryPopup from "./components/PopUp";
import CourseLayout from "./dashboard/pathways/course/CourseLayout";
import CreateCourseLayout from "./dashboard/pathways/course/CreateCourseLayout";
import CreateCourse from "./dashboard/pathways/course/CreateCourse";
import Course from "./dashboard/pathways/course/Course";
import Learn from "./dashboard/pathways/course/learn/Learn";
function App() {
  const { isSessionExpired, setIsSessionExpired } = useSessionManager();
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NetworkStatusProvider>
        <Toaster position="bottom-right" richColors />
        <NetworkStatusHandler />
        <div className="App relative">
          <Router>
            <SessionExpiryPopup
              show={isSessionExpired}
              onClose={() => {
                setIsSessionExpired(false);
              }}
              message={
                isSessionExpired
                  ? "Please log in again to continue using the app."
                  : "You do not have access to this resource."
              }
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/verify" element={<InputOTPForm />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/session"
                element={
                  <ProtectedRoute>
                    <InterviewSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/cc"
                element={
                  <ProtectedRoute>
                    <CreateCourseLayout children={<CreateCourse />} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/cc/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:courseId"
                element={
                  <ProtectedRoute>
                    <Course />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/course/:courseId/learn"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="scenario"
                element={
                  <ProtectedRoute>
                    <Scenario />
                  </ProtectedRoute>
                }
              />
              <Route
                path="interview"
                element={
                  <ProtectedRoute>
                    <Interview />
                  </ProtectedRoute>
                }
              />

              <Route
                path="setting"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </div>
      </NetworkStatusProvider>
    </ThemeProvider>
  );
}

export default App;
