import React from "react";
import Hero from "../components/home/Hero";
import ProductShowcase from "../components/home/ProductShowcase";
import HomeWorkflows from "../components/home/HomeWorkflows";
import VocalisDefinition from "../components/home/VocalisDefinition";
import TrustSection from "../components/home/TrustSection";
import DemoRequestForm from "../components/home/DemoRequestForm";
import { usePageMeta } from "../lib/hooks";

export default function HomePage() {
  usePageMeta("Vocalis is an AI receptionist for independent clinics. It answers every call, books appointments, and shows your team why patients keep calling back."
  );
  return (
    <>
      <Hero />
      <ProductShowcase />
      <HomeWorkflows />
      <VocalisDefinition />
      <TrustSection />
      <DemoRequestForm />
    </>
  );
}
