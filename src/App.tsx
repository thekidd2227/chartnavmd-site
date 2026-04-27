import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import ChartnavHome from "@/pages/chartnav/Home";
import ChartnavAssessment from "@/pages/chartnav/Assessment";
import ChartnavThankYou from "@/pages/chartnav/ThankYou";
import {
  SecurityPage as ChartnavSecurity,
  InsightsPage as ChartnavInsights,
} from "@/pages/chartnav/Placeholder";
import ChartnavPlatform from "@/pages/chartnav/Platform";
import ChartnavOphthalmology from "@/pages/chartnav/Ophthalmology";
import ChartnavImplementation from "@/pages/chartnav/Implementation";
import ChartnavWhy from "@/pages/chartnav/WhyChartnav";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import SecurityLegal from "@/pages/legal/Security";
import Accessibility from "@/pages/legal/Accessibility";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* ChartNav — promoted from /chartnav/* to root for chartnavmd.com standalone deployment. */}
      <Route path="/" component={ChartnavHome} />
      <Route path="/why-chartnav" component={ChartnavWhy} />
      <Route path="/assessment" component={ChartnavAssessment} />
      <Route path="/thank-you" component={ChartnavThankYou} />
      <Route path="/platform" component={ChartnavPlatform} />
      <Route path="/ophthalmology" component={ChartnavOphthalmology} />
      <Route path="/security" component={ChartnavSecurity} />
      <Route path="/implementation" component={ChartnavImplementation} />
      <Route path="/insights" component={ChartnavInsights} />

      {/* Backward-compat: anything inbound under /chartnav/* (e.g. someone followed a stale arcgsystems link)
          redirects to the equivalent root path on this domain. */}
      <Route path="/chartnav">{() => <Redirect to="/" />}</Route>
      <Route path="/chartnav/why-chartnav">{() => <Redirect to="/why-chartnav" />}</Route>
      <Route path="/chartnav/assessment">{() => <Redirect to="/assessment" />}</Route>
      <Route path="/chartnav/thank-you">{() => <Redirect to="/thank-you" />}</Route>
      <Route path="/chartnav/platform">{() => <Redirect to="/platform" />}</Route>
      <Route path="/chartnav/ophthalmology">{() => <Redirect to="/ophthalmology" />}</Route>
      <Route path="/chartnav/security">{() => <Redirect to="/security" />}</Route>
      <Route path="/chartnav/implementation">{() => <Redirect to="/implementation" />}</Route>
      <Route path="/chartnav/insights">{() => <Redirect to="/insights" />}</Route>

      {/* Legal / policy — required on any production site. */}
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/legal/security" component={SecurityLegal} />
      <Route path="/accessibility" component={Accessibility} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
