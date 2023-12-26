import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";
import Error from "./error";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { CartItemProvider } from "./context/CartItemContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <CookiesProvider
      
        defaultSetOptions={{
          expires: new Date(2029, 11, 26, 12, 30, 0, 0),
          maxAge: "1000",
          path: "/",
          secure: true,
          sameSite: "none",
          domain: "https://www.to-analytics.com/",
          httpOnly: true,
        }}
      >
        <CartItemProvider>
          <ContextProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ContextProvider>
        </CartItemProvider>
      </CookiesProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// https://analytics.google.com/analytics/web/#/p416965870/reports/intelligenthome?params=_u..nav%3Dmaui
