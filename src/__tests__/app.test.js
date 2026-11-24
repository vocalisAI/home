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
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://www.vocalis.cc/product");
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

describe("navigation focus", () => {
  test("skip link moves focus into the main landmark", () => {
    renderAt("/");
    userEvent.click(screen.getByRole("link", { name: "Skip to content" }));
    expect(screen.getByRole("main")).toHaveFocus();
  });

  test("a link to a lazy page section focuses its heading", async () => {
    renderAt("/");
    userEvent.click(within(screen.getByRole("contentinfo")).getByRole("link", { name: "Insurance Follow-Up" }));
    const heading = await screen.findByRole("heading", { name: /insurance/i, level: 2 });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(document.title).toBe("Clinic Phone Workflows and After-Hours Calls | Vocalis");
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
    expect(screen.getByLabelText("Your name")).toHaveFocus();
    expect(screen.getByLabelText("Your name")).toHaveAccessibleDescription("Please enter your name.");
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

  test("focuses the invalid letter request field and updates its error as it is corrected", () => {
    render(<LoiRequest />);
    const clinic = screen.getByLabelText("Clinic name");
    const email = screen.getByLabelText("Work email");
    const request = screen.getByRole("button", { name: "Open email request" });
    userEvent.click(request);
    expect(clinic).toHaveFocus();
    expect(clinic).toHaveAccessibleDescription("Please enter your clinic’s name.");
    userEvent.type(clinic, "Test Clinic");
    expect(clinic).toHaveAttribute("aria-invalid", "false");
    userEvent.click(request);
    expect(email).toHaveFocus();
    expect(email).toHaveAccessibleDescription("Please enter a valid work email.");
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

describe("search metadata", () => {
  test("missing pages are excluded from indexing and the directive clears on navigation", async () => {
    renderAt("/unknown-vocalis-page");
    await screen.findByRole("heading", { name: /couldn’t find/i });
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    userEvent.click(screen.getByRole("link", { name: "Back to home" }));
    await screen.findByRole("heading", { name: /AI Receptionist for Independent Clinics/i });
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "max-image-preview:large");
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://www.vocalis.cc/");
  });
});
