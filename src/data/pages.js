export const SITE_URL = "https://www.vocalis.cc";

export const PAGES = [
  {
    path: "/",
    title: "AI Receptionist for Independent Clinics",
    description: "Vocalis answers clinic calls, handles appointment requests and shows your team why patients keep calling back.",
    load: () => import("../pages/HomePage"),
  },
  {
    path: "/product",
    title: "AI Medical Receptionist and Call Intelligence",
    description: "See how Vocalis answers calls, routes requests to staff, schedules visits and shows where patients get stuck.",
    load: () => import("../pages/ProductPage"),
  },
  {
    path: "/workflows",
    title: "Clinic Phone Workflows and After-Hours Calls",
    description: "See examples of Vocalis handling appointment changes, insurance follow-up, after-hours callbacks and staff handoffs.",
    load: () => import("../pages/WorkflowsPage"),
  },
  {
    path: "/pricing",
    title: "AI Receptionist Pricing for Clinics",
    description: "Compare Vocalis monthly plans, included call minutes and overage pricing for independent clinics.",
    load: () => import("../pages/PricingPage"),
  },
  {
    path: "/security",
    title: "Patient Data Security and Privacy",
    description: "See where patient information goes during a Vocalis call and how encryption, access permissions and audit logs protect it.",
    load: () => import("../pages/SecurityPage"),
  },
  {
    path: "/about",
    title: "About Vocalis and Our Founders",
    description: "Meet the Vocalis founders and learn why their work in clinics and machine learning led to an AI receptionist for independent clinics.",
    load: () => import("../pages/AboutPage"),
  },
];

export const NOT_FOUND = {
  path: "*",
  title: "Page Not Found",
  description: "The Vocalis page you requested could not be found.",
  load: () => import("../pages/NotFoundPage"),
};

export function pageFor(pathname) {
  const path = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  return PAGES.find((page) => page.path === path) || NOT_FOUND;
}
