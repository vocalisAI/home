import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";
import DemoRequestForm from "../components/home/DemoRequestForm";
import LoiRequest from "../components/pricing/LoiRequest";

beforeAll(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} }));
});

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

describe("showcase tabs", () => {
  test("arrow keys move selection and wrap; only one panel visible", () => {
    renderAt("/");
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.textContent.trim())).toEqual(["Answer", "Understand", "Act", "Improve"]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Understand" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Understand" }), { key: "End" });
    expect(screen.getByRole("tab", { name: "Improve" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Improve" }), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Answer" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByRole("tabpanel").filter((p) => !p.hidden)).toHaveLength(1);
  });

  test("Act: next step is hidden until requested and reset restores it", async () => {
    renderAt("/");
    userEvent.click(screen.getByRole("tab", { name: "Act" }));
    expect(screen.getByText(/Press “Show next step”/)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /Show next step/ }));
    expect(screen.getByText(/Consult booked/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /Reset example/ }));
    expect(screen.getByText(/Press “Show next step”/)).toBeInTheDocument();
  });

  test("Improve: switching reason updates recommendation", () => {
    renderAt("/");
    userEvent.click(screen.getByRole("tab", { name: "Improve" }));
    expect(screen.getByText(/late morning/)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /After-Hours Messages/ }));
    expect(screen.getByText(/overnight/)).toBeInTheDocument();
  });
});

describe("product deep links", () => {
  test("known feature opens that tab", async () => {
    renderAt("/product?feature=call-intelligence");
    expect(await screen.findByRole("tab", { name: "Call Intelligence" })).toHaveAttribute("aria-selected", "true");
  });
  test("unknown feature falls back to the first view", async () => {
    renderAt("/product?feature=nope");
    expect(await screen.findByRole("tab", { name: "Voice Receptionist" })).toHaveAttribute("aria-selected", "true");
  });
});

describe("header menu", () => {
  test("dropdown opens by click and closes with Escape, restoring focus", () => {
    renderAt("/");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const trigger = within(nav).getByRole("button", { name: /Product/ });
    userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(within(nav).getByRole("link", { name: /Call Intelligence/ })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
  test("mobile menu toggles and Escape returns focus to toggle", () => {
    renderAt("/");
    const toggle = screen.getByRole("button", { name: /Menu/ });
    userEvent.click(toggle);
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
    expect(toggle).toHaveFocus();
  });
});

describe("legacy anchors", () => {
  test("/#pricing redirects to the pricing page", async () => {
    renderAt("/#pricing");
    expect(await screen.findByRole("heading", { level: 1, name: /Simple Plans/ })).toBeInTheDocument();
  });
});

describe("contact email requests", () => {
  const fill = () => {
    userEvent.type(screen.getByLabelText(/Your name/), "Dr. Test");
    userEvent.type(screen.getByLabelText(/^Clinic/), "Test Clinic");
    userEvent.type(screen.getByLabelText(/Work email/), "test@example.com");
  };

  test("validates required fields before opening email", async () => {
    const click = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<DemoRequestForm />);
    userEvent.click(screen.getByRole("button", { name: /Open email to request a demo/ }));
    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(click).not.toHaveBeenCalled();
    click.mockRestore();
  });

  test("rejects a malformed email", async () => {
    const click = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<DemoRequestForm />);
    userEvent.type(screen.getByLabelText(/Your name/), "A");
    userEvent.type(screen.getByLabelText(/^Clinic/), "B");
    userEvent.type(screen.getByLabelText(/Work email/), "nope");
    userEvent.click(screen.getByRole("button", { name: /Open email to request a demo/ }));
    expect(await screen.findByText(/doesn’t look right/)).toBeInTheDocument();
    expect(click).not.toHaveBeenCalled();
    click.mockRestore();
  });

  test("prepares an addressed demo email without claiming it was sent", async () => {
    const click = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<DemoRequestForm />);
    fill();
    userEvent.click(screen.getByRole("button", { name: /Open email to request a demo/ }));
    expect(click).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent(/Press Send there to finish/);
    const href = screen.getByRole("link", { name: "open the prepared email" }).getAttribute("href");
    expect(href).toContain("mailto:meetvocalis@gmail.com");
    expect(decodeURIComponent(href)).toContain("Clinic: Test Clinic");
    expect(decodeURIComponent(href)).toContain("Reply email: test@example.com");
    click.mockRestore();
  });

  test("prepares a letter request with the clinic name", () => {
    const click = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<LoiRequest />);
    userEvent.type(screen.getByLabelText("Clinic name"), "Test Clinic");
    userEvent.type(screen.getByLabelText("Work email"), "test@example.com");
    userEvent.click(screen.getByRole("button", { name: "Open email request" }));
    expect(click).toHaveBeenCalledTimes(1);
    const href = screen.getByRole("link", { name: "open the prepared email" }).getAttribute("href");
    expect(decodeURIComponent(href)).toContain("Vocalis Letter of Intent request");
    expect(decodeURIComponent(href)).toContain("Clinic: Test Clinic");
    click.mockRestore();
  });
});

describe("reduced motion", () => {
  const original = window.matchMedia;
  afterEach(() => { window.matchMedia = original; });

  test("walkthrough shows the full transcript with no play controls", () => {
    window.matchMedia = (q) => ({ matches: /reduce/.test(q), media: q, addEventListener() {}, removeEventListener() {} });
    renderAt("/");
    expect(screen.queryByRole("button", { name: /Play walkthrough/ })).toBeNull();
    expect(screen.getAllByText(/Riverside Cardiology, this is Vocalis/).length).toBeGreaterThan(0);
    expect(screen.getByText(/booked your consult for Tuesday at 10:30/)).toBeVisible();
  });

  test("with motion allowed, play control exists and transcript is still fully visible at rest", () => {
    renderAt("/");
    expect(screen.getByRole("button", { name: /Play walkthrough/ })).toBeInTheDocument();
    expect(screen.getByText(/booked your consult for Tuesday at 10:30/)).toBeVisible();
  });
});

describe("static homepage shell", () => {
  // public/index.html paints the hero before JavaScript loads. Its copy must match the real Hero.
  const fs = require("fs");
  const path = require("path");
  const html = fs.readFileSync(path.join(__dirname, "../../public/index.html"), "utf8");
  const text = (s) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  test("matches the Hero headline, lead and calls to action", () => {
    renderAt("/");
    const hero = document.querySelector("section.hero");
    const norm = (s) => s.replace(/\s+/g, " ").trim();
    expect(html).toContain(norm(hero.querySelector(".hero__eyebrow").textContent));
    const squash = (x) => x.replace(/\s+/g, "");
    expect(squash(text(html))).toContain(squash(hero.querySelector(".hero__title").textContent));
    expect(html).toContain(norm(hero.querySelector(".hero__lead").textContent));
    ["Book a demo", "See it live"].forEach((label) => {
      expect(text(html)).toContain(label);
      expect(hero.textContent).toContain(label);
    });
  });

  test("works without JavaScript: calls to action are real links", () => {
    expect(html).toContain('<a href="/#contact" class="btn btn--primary">Book a demo</a>');
    expect(html).toMatch(/href="%PUBLIC_URL%\/media\/vocalis-overview\.mp4"/);
  });
});
