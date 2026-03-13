import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/components/AppHeader";
import { InstallPrompt } from "@/components/InstallPrompt";
import TarugoPage from "./pages/Tarugo";
import PlacaPage from "./pages/Placa";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppHeader />
        <main className="min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<TarugoPage />} />
            <Route path="/placa" element={<PlacaPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <InstallPrompt />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
