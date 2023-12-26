import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './ErrorBoundary';
import Error from './error';
import { ContextProvider } from './context/ContextProvider.jsx';
import { CartItemProvider } from './context/CartItemContext.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
    <CookiesProvider defaultSetOptions={{ path: 'http://localhost:5173/dashboard/makePayment' ,sameSite:"strict" , domain:"http://localhost:5173", httpOnly:false, }} >
      <CartItemProvider>
        <ContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ContextProvider>
      </CartItemProvider>
      </CookiesProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

// https://analytics.google.com/analytics/web/#/p416965870/reports/intelligenthome?params=_u..nav%3Dmaui
