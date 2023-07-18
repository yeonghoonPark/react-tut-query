import React from "react";

import "./App.css";
import MainProducts from "./components/MainProducts";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MainProducts />
    </QueryClientProvider>
  );
}

export default App;
