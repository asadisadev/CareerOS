import { Routes, Route } from "react-router-dom";
import { ScrollToHash } from './components/common/ScrollToHash';
import { AuthProvider } from './context/AuthContext'; // <-- IMPORT THIS

// Layout
import { AppShell } from "./components/app/app-shell";

// Marketing sections
import {
  Hero, Features, HowItWorks, Pricing, Testimonials, Faq, FinalCta,
} from "./components/marketing/sections";
import LandingPage from "./components/marketing/landingpage";

// Auth pages
import LoginPage from "./components/auth/loginpage";
import RegisterPage from "./components/auth/registerpage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import VerifyEmailPage from "./components/auth/VerifyEmailPage";

// App pages
import Dashboard from "./components/app/dashboard";
import Portfolio from "./components/app/portfolio";
import Resume from "./components/app/resume";
import Coach from "./components/app/coach/coach";
import Jobs from "./components/app/jobs/jobs";
import Applications from "./components/app/applications/Applications";
import Analytics from "./components/app/analytics/Analytics";
import Settings from "./components/app/settings/Settings";
import Ats from "./components/app/ats/Ats";
import Interview from "./components/app/interview/Interview";
import Linkedin from "./components/app/linekdin/Linkedin";
import Roadmap from "./components/app/raodmap/Roadmap";
import Help from "./components/app/help/Help";
import Billing from "./components/app/billing/Billing";
import Admin from "./components/app/admin/Admin";

// Onboarding
import OnboardingWelcome from "./components/onboarding/OnboardingWelcome";
import OnboardingInterview from "./components/onboarding/OnboardingInterview";
import OnboardingIndex from "./components/onboarding/OnboardingIndex";
import { TemplatesPage } from "./components/marketing/TemplatesPage";
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ScrollToHash />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

        {/* Protected routes - user must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingIndex />} />
          <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
          <Route path="/onboarding/interview" element={<OnboardingInterview />} />
          
          <Route element={<AppShell />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/portfolio" element={<Portfolio />} />
            <Route path="/app/resume" element={<Resume />} />
            <Route path="/app/coach" element={<Coach />} />
            <Route path="/app/jobs" element={<Jobs />} />
            <Route path="/app/applications" element={<Applications />} />
            <Route path="/app/analytics" element={<Analytics />} />
            <Route path="/app/settings" element={<Settings />} />
            <Route path="/app/ats" element={<Ats />} />
            <Route path="/app/interview" element={<Interview />} />
            <Route path="/app/linkedin" element={<Linkedin />} />
            <Route path="/app/roadmap" element={<Roadmap />} />
            <Route path="/app/help" element={<Help />} />
            <Route path="/app/billing" element={<Billing />} />
            <Route path="/app/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
// function App() {
//   return (
//     <AuthProvider>  {/* <--- WRAP EVERYTHING WITH AuthProvider */}
//       <ScrollToHash />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/how-it-works" element={<HowItWorks />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/templates" element={<TemplatesPage />} />

//         <Route path="/auth/login" element={<LoginPage />} />
//         <Route path="/auth/register" element={<RegisterPage />} />
//         <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
//         <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

//         <Route path="/onboarding" element={<OnboardingIndex />} />
//         <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
//         <Route path="/onboarding/interview" element={<OnboardingInterview />} />

//         <Route element={<AppShell />}>
//           <Route path="/app" element={<Dashboard />} />
//           <Route path="/app/dashboard" element={<Dashboard />} />
//           <Route path="/app/portfolio" element={<Portfolio />} />
//           <Route path="/app/resume" element={<Resume />} />
//           <Route path="/app/coach" element={<Coach />} />
//           <Route path="/app/jobs" element={<Jobs />} />
//           <Route path="/app/applications" element={<Applications />} />
//           <Route path="/app/analytics" element={<Analytics />} />
//           <Route path="/app/settings" element={<Settings />} />
//           <Route path="/app/ats" element={<Ats />} />
//           <Route path="/app/interview" element={<Interview />} />
//           <Route path="/app/linkedin" element={<Linkedin />} />
//           <Route path="/app/roadmap" element={<Roadmap />} />
//           <Route path="/app/help" element={<Help />} />
//           <Route path="/app/billing" element={<Billing />} />
//           <Route path="/app/admin" element={<Admin />} />
//         </Route>
//       </Routes>
//     </AuthProvider>
//   );
// }

export default App;
