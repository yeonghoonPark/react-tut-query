import React from "react";

import "./App.css";
import MainProducts from "./components/MainProducts";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainProducts />
    </QueryClientProvider>
  );
}

export default App;
