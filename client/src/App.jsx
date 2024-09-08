import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import Admin from "../src/blockchain/abis/Admin.json";
import "react-toastify/dist/ReactToastify.css";
import MetaMaskGuide from "../src/blockchain/MetaMaskGuide";
import { Container } from "semantic-ui-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPageCreate from "../src/blockchain/pages/Admin/CreateUser";
import AllEmployees from "../src/blockchain/pages/Admin/AllEmployees";
import AllOrganizationEndorser from "../src/blockchain/pages/Admin/AllOrganizationEndorser";
import EmployeePage from "../src/blockchain/pages/Employee/Employee";
import UpdateProfile from "../src/blockchain/pages/Employee/UpdateProfile";
import Organization from "../src/blockchain/pages/OrganizationEndorser/Organization";
import EndorseSkill from "../src/blockchain/pages/OrganizationEndorser/EndorseSkill";
import Endorse from "../src/blockchain/pages/OrganizationEndorser/EndorseSection";
import Navbar from "../src/blockchain/components/Navbar";
import GetEmployee from "../src/blockchain/pages/GetRoutes/GetEmployee";
import GetOrg from "../src/blockchain/pages/GetRoutes/GetOrg";
import NoRole from "../src/blockchain/pages/NoRole/NoRole";
import Notifications from "../src/blockchain/pages/NoRole/Notifications";
import NotificationsAdmin from "../src/blockchain/pages/Admin/Notifications";
import NotificationsEmployee from "../src/blockchain/pages/Employee/Notifications";
import NotificationsOrg from "../src/blockchain/pages/OrganizationEndorser/Notifications";
import LoadComp from "../src/blockchain/components/LoadComp";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./authentication/log-in";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import Scenario from "./dashboard/interview/components/scenario/Scenario";
import Interview from "./dashboard/interview/InterviewPage";
import SignUp from "./authentication/sign-up";
import Error from "./components/Error";
import Setting from "./dashboard/setting/Setting";
import InterviewSession from "./dashboard/interview/components/session/Session";
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
import MyProfile from "./dashboard/myProfile/MyProfile";
import Base from "./home/Base";
import Community from "./dashboard/community/Community";
import InterviewPage from "./dashboard/interview/InterviewPage";
import Flow from "./home/start/Flow";
import CompetencyDiagnostic from "./competency/CompetencyDiagnostic";
import NextBestStepWidget from "./insights/next-best-steps/NextBestStepWidget";
import Resume from "./dashboard/resume/Resume";
import JobsPageLayout from "./jobs/JobPageLayout";
import ChatSupport from "./components/chatbot/ChatSupport";
import AnimateR from "./routes/AnimatedRouter";
import { AuroraBackgroundDemo } from "./components/example/aurora-background-demo";
import BackgroundBeamsDemo from "./components/example/background-beams-demo";
import AppleCardsCarouselDemo from "./components/example/apple-cards-carousel-demo-2";
import FlowLayout from "./home/start/FlowLayout";
// import VideoCall from "./dashboard/community/mentor/components/VideoCall";

// function App() {
//   const [isMeta, setisMeta] = useState(false);
//   const [isEmployee, setisEmployee] = useState(false);
//   const [account, setaccount] = useState("");
//   const [isOrganizationEndorser, setisOrganizationEndorser] = useState(false);
//   const [isOwner, setisOwner] = useState(false);
//   const [loadcomp, setloadcomp] = useState(false);

//   const loadBlockChainData = async () => {
//     const web3 = window.web3;
//     const accounts = await web3.eth.getAccounts();
//     // console.log(accounts);
//     if (accounts) {
//       setaccount(accounts[0]);
//     }
//     const networkId = await web3.eth.net.getId();
//     console.log(networkId);
//     const AdminData = await Admin.networks[networkId];
//     console.log(AdminData);
//     if (AdminData) {
//       const admin = new web3.eth.Contract(Admin.abi, AdminData.address);
//       const isEmployee = await admin.methods.isEmployee(accounts[0]).call();
//       const isOrganizationEndorser = await admin.methods
//         .isOrganizationEndorser(accounts[0])
//         .call();
//       const owner = await admin.methods.owner().call();
//       console.log(owner);
//       setisEmployee(isEmployee);
//       setisOrganizationEndorser(isOrganizationEndorser);
//       setisOwner(owner === accounts[0]);
//     } else {
//       toast.error("The Admin Contract does not exist on this network!");
//     }
//   };

//   useEffect(() => {
//     const func = async () => {
//       setisMeta(true);
//       setloadcomp(true);
//       if (window.ethereum) {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         window.web3 = new Web3(window.ethereum);
//         await loadBlockChainData();
//       } else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider);
//         await loadBlockChainData();
//       } else {
//         setisMeta(false);
//       }
//       setloadcomp(false);
//     };
//     func();
//   }, []);

//   // const adminRoutes = () => (
//   //   <Routes>
//   //     <Route path="/" element={<AllEmployees />} />
//   //     <Route
//   //       path="/all-organization-endorser"
//   //       element={<AllOrganizationEndorser />}
//   //     />
//   //     <Route path="/create-user" element={<AdminPageCreate />} />
//   //     <Route path="/notifications" element={<NotificationsAdmin />} />
//   //   </Routes>
//   // );

//   // const employeeRoutes = () => (
//   //   <Routes>
//   //     <Route path="/" element={<EmployeePage />} />
//   //     <Route path="/update-profile" element={<UpdateProfile />} />
//   //     <Route path="/notifications" element={<NotificationsEmployee />} />
//   //   </Routes>
//   // );

//   // const isOrganizationEndorserRoutes = () => (
//   //   <Routes>
//   //     <Route path="/" element={<Organization />} />
//   //     <Route path="/endorse-skill" element={<EndorseSkill />} />
//   //     <Route path="/endorse-section" element={<Endorse />} />
//   //     <Route path="/notifications" element={<NotificationsOrg />} />
//   //   </Routes>
//   // );

//   // const noRoleRoutes = () => (
//   //   <Routes>
//   //     <Route path="/" element={<NoRole />} />
//   //     <Route path="/notifications" element={<Notifications />} />
//   //   </Routes>
//   // );

//   // const renderRoutes = () => {
//   //   if (isOwner) return adminRoutes();
//   //   else if (isEmployee) return employeeRoutes();
//   //   else if (isOrganizationEndorser) return isOrganizationEndorserRoutes();
//   //   else return noRoleRoutes();
//   // };

//   return (
//     <div>
//       {loadcomp ? (
//         <LoadComp />
//       ) : isMeta && account !== "" ? (
//         <BrowserRouter>
//           <Navbar />
//           <Container>
//             <ToastContainer />
//             <Routes>
//               {/* Common Routes */}
//               <Route
//                 path="/getemployee/:employee_address"
//                 element={<GetEmployee />}
//               />
//               <Route path="/getOrg/:orgAddress" element={<GetOrg />} />

//               {/* Admin Routes */}
//               {isOwner && (
//                 <>
//                   <Route path="/" element={<AllEmployees />} />
//                   <Route
//                     path="/all-organization-endorser"
//                     element={<AllOrganizationEndorser />}
//                   />
//                   <Route path="/create-user" element={<AdminPageCreate />} />
//                   <Route
//                     path="/notifications"
//                     element={<NotificationsAdmin />}
//                   />
//                 </>
//               )}

//               {/* Employee Routes */}
//               {isEmployee && (
//                 <>
//                   <Route path="/" element={<EmployeePage />} />
//                   <Route path="/update-profile" element={<UpdateProfile />} />
//                   <Route
//                     path="/notifications"
//                     element={<NotificationsEmployee />}
//                   />
//                 </>
//               )}

//               {/* Organization Endorser Routes */}
//               {isOrganizationEndorser && (
//                 <>
//                   <Route path="/" element={<Organization />} />
//                   <Route path="/endorse-skill" element={<EndorseSkill />} />
//                   <Route path="/endorse-section" element={<Endorse />} />
//                   <Route path="/notifications" element={<NotificationsOrg />} />
//                 </>
//               )}

//               {/* No Role Routes */}
//               {!isOwner && !isEmployee && !isOrganizationEndorser && (
//                 <>
//                   <Route path="/" element={<NoRole />} />
//                   <Route path="/notifications" element={<Notifications />} />
//                 </>
//               )}
//             </Routes>
//           </Container>
//         </BrowserRouter>
//       ) : (
//         <MetaMaskGuide />
//       )}
//     </div>
//   );
// }

function App() {
  const { isSessionExpired, setIsSessionExpired } = useSessionManager();
  const [isMeta, setisMeta] = useState(false);
  const [isEmployee, setisEmployee] = useState(false);
  const [account, setaccount] = useState("");
  const [isOrganizationEndorser, setisOrganizationEndorser] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [loadcomp, setloadcomp] = useState(false);

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setaccount(accounts[0]);
    }
    const networkId = await web3.eth.net.getId();
    const AdminData = await Admin.networks[networkId];
    if (AdminData) {
      const admin = new web3.eth.Contract(Admin.abi, AdminData.address);
      const isEmployee = await admin.methods.isEmployee(accounts[0]).call();
      const isOrganizationEndorser = await admin.methods
        .isOrganizationEndorser(accounts[0])
        .call();
      const owner = await admin.methods.owner().call();
      setisEmployee(isEmployee);
      setisOrganizationEndorser(isOrganizationEndorser);
      setisOwner(owner === accounts[0]);
    } else {
      toast.error("The Admin Contract does not exist on this network!");
    }
  };

  useEffect(() => {
    const func = async () => {
      setisMeta(true);
      setloadcomp(true);
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
        await loadBlockChainData();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        await loadBlockChainData();
      } else {
        setisMeta(false);
      }
      setloadcomp(false);
    };
    func();
  }, []);

  const adminRoutes = () => (
    <Routes>
      <Route path="/admin" element={<AllEmployees />} />
      <Route
        path="/admin/all-organization-endorser"
        element={<AllOrganizationEndorser />}
      />
      <Route path="/admin/create-user" element={<AdminPageCreate />} />
      <Route path="/admin/notifications" element={<NotificationsAdmin />} />
    </Routes>
  );

  const employeeRoutes = () => (
    <Routes>
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="/employee/update-profile" element={<UpdateProfile />} />
      <Route
        path="/employee/notifications"
        element={<NotificationsEmployee />}
      />
    </Routes>
  );

  const isOrganizationEndorserRoutes = () => (
    <Routes>
      <Route path="/organization" element={<Organization />} />
      <Route path="/organization/endorse-skill" element={<EndorseSkill />} />
      <Route path="/organization/endorse-section" element={<Endorse />} />
      <Route
        path="/organization/notifications"
        element={<NotificationsOrg />}
      />
    </Routes>
  );

  const noRoleRoutes = () => (
    <Routes>
      <Route path="/no-role" element={<NoRole />} />
      <Route path="/no-role/notifications" element={<Notifications />} />
    </Routes>
  );

  const renderBlockchainRoutes = () => {
    if (isOwner) return adminRoutes();
    else if (isEmployee) return employeeRoutes();
    else if (isOrganizationEndorser) return isOrganizationEndorserRoutes();
    else return noRoleRoutes();
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NetworkStatusProvider>
        <Toaster position="bottom-right" richColors />
        <NetworkStatusHandler />
        <div className="App relative">
          <BrowserRouter>
            <SessionExpiryPopup
              show={isSessionExpired}
              onClose={() => setIsSessionExpired(false)}
              message={
                isSessionExpired
                  ? "Please log in again to continue using the app."
                  : "You do not have access to this resource."
              }
            />

            <Routes>
              <Route path="/" element={<Base />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/verify" element={<InputOTPForm />} />

              <Route
                path="/flow"
                element={
                  <AnimateR>
                    <FlowLayout>
                      <Flow />
                    </FlowLayout>
                  </AnimateR>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/community" element={<Community />} />
              <Route
                path="/jobs/:jobId"
                element={<ProtectedRoute></ProtectedRoute>}
              />
              <Route
                path="/dashboard/interviews/track"
                element={<ProtectedRoute></ProtectedRoute>}
              />

              <Route
                path="/dashboard/next-step"
                element={
                  <ProtectedRoute>
                    <NextBestStepWidget />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/community/mentor"
                element={
                  <ProtectedRoute>
                    <VideoCall />
                  </ProtectedRoute>
                }
              /> */}

              <Route
                path="/diagnostic"
                element={
                  <ProtectedRoute>
                    <CompetencyDiagnostic />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/mock"
                element={
                  <ProtectedRoute>
                    <InterviewPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/jobs" element={<JobsPageLayout />} />
              <Route
                path="/dashboard/cc"
                element={
                  <ProtectedRoute>
                    <CreateCourseLayout>
                      <CreateCourse />
                    </CreateCourseLayout>
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
                path="/scenario"
                element={
                  <ProtectedRoute>
                    <Scenario />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <Resume />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/interview"
                element={
                  <ProtectedRoute>
                    <Interview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/getemployee/:employee_address"
                element={<GetEmployee />}
              />
              <Route path="/getOrg/:orgAddress" element={<GetOrg />} /> */}

              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </div>
      </NetworkStatusProvider>
    </ThemeProvider>
  );
}

export default App;
