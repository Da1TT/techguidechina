import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

function App() {
  useEffect(() => {
    // Ensure smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <HashRouter>
          <AppRouter />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </HashRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
