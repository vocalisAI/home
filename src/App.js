import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import { NOT_FOUND, PAGES, pageFor } from "./data/pages";
import "./styles/base.css";
import "./styles/sections.css";
import "./styles/pricing.css";

const routes = [...PAGES, NOT_FOUND].map((page) => ({
  path: page.path,
  View: page.path === "/" ? HomePage : lazy(page.load),
}));

export async function loadInitialRoute(pathname) {
  const page = pageFor(pathname);
  return { path: page.path, View: page.path === "/" ? HomePage : (await page.load()).default };
}

export const AppRoutes = ({ initialRoute } = {}) => (
  <Routes>
    <Route element={<Layout />}>
      {routes.map(({ path, View }) => {
        const Page = initialRoute?.path === path ? initialRoute.View : View;
        return <Route key={path} path={path} element={<Page />} />;
      })}
    </Route>
  </Routes>
);

export default function App({ initialRoute }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppRoutes initialRoute={initialRoute} />
    </BrowserRouter>
  );
}
