import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import TodosPage from "./pages/TodosPage";
import IdeasPage from "./pages/IdeasPage";
import SignInPage from "./pages/SignInPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Dashboard routes with layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/todo" element={<TodosPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
