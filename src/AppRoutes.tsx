import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import HeatmapPage from "./pages/HeatmapPage";
import SearchPage from "./pages/SearchPage";

type Props = {};

const AppRoutes: React.FC<Props> = () => {
  return (
    <div id={"mainDiv"}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
