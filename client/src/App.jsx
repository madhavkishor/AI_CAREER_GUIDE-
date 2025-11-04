import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import JobResults from "./pages/JobResults";
import DomainInsights from "./pages/DomainInsights";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen   text-gray-900">
          <Header />
          <main className="container mx-auto px-4 pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<JobResults />} />
              <Route path="/insights" element={<DomainInsights />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
