import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import "./styles/base.css";
import "./styles/sections.css";
import "./styles/pricing.css";

// Only the homepage ships in the first bundle; every other page loads when it is visited.
const ProductPage = lazy(() => import("./pages/ProductPage"));
const WorkflowsPage = lazy(() => import("./pages/WorkflowsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="workflows" element={<WorkflowsPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="security" element={<SecurityPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
