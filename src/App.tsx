import React from 'react';
import './App.css';
import { InitProvider } from "./init"
import { Layout } from "./components/Layout"

function App() {
  return <InitProvider>
    <Layout/>
  </InitProvider>
}

export default App;
