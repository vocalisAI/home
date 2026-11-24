import { SITE_URL } from "../data/pages";
import { PLANS } from "../data/pricing";
import { CONTACT_EMAIL } from "../data/site";

const logo = `${SITE_URL}/brand/vocalis-mark-256.png`;
const socialImage = `${SITE_URL}/social-image.png`;
const organization = `${SITE_URL}/#organization`;
const website = `${SITE_URL}/#website`;
const service = `${SITE_URL}/product#service`;

export function pageHead(page) {
  const title = `${page.title} | Vocalis`;
  const indexable = page.path !== "*";
  const canonical = indexable ? `${SITE_URL}${page.path}` : null;
  const meta = [
    ["name", "description", page.description],
    ["name", "robots", indexable ? "max-image-preview:large" : "noindex"],
    ["property", "og:type", "website"],
    ["property", "og:site_name", "Vocalis"],
    ["property", "og:url", canonical],
    ["property", "og:title", title],
    ["property", "og:description", page.description],
    ["property", "og:image", socialImage],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", page.description],
    ["name", "twitter:image", socialImage],
  ];
  return { title, canonical, meta, structuredData: indexable ? pageSchema(page, canonical, title) : null };
}

function pageSchema(page, url, name) {
  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description: page.description,
    isPartOf: { "@id": website },
    inLanguage: "en",
  };
  const graph = [webPage];
  if (page.path === "/") {
    graph.push(
      { "@type": "Organization", "@id": organization, name: "Vocalis", url, logo, email: CONTACT_EMAIL },
      { "@type": "WebSite", "@id": website, name: "Vocalis", url, publisher: { "@id": organization }, inLanguage: "en" },
    );
  }
  if (page.path === "/product") {
    webPage.mainEntity = { "@id": service };
    graph.push({
      "@type": "Service",
      "@id": service,
      name: "Vocalis AI Receptionist",
      serviceType: "AI receptionist for independent clinics",
      url,
      description: page.description,
      provider: { "@id": organization },
    });
  }
  if (page.path === "/pricing") {
    webPage.mainEntity = {
      "@type": "OfferCatalog",
      name: "Vocalis monthly plans",
      itemListElement: PLANS.map(({ id, name: plan, monthly, included }) => ({
        "@type": "Offer",
        name: `Vocalis ${plan}`,
        url: `${url}#plan-${id}`,
        description: `Includes ${included} call minutes per month.`,
        itemOffered: { "@id": service },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: monthly,
          priceCurrency: "USD",
          unitText: "month",
        },
      })),
    };
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function updatePageHead(page) {
  const { title, canonical, meta, structuredData } = pageHead(page);
  document.title = title;

  function update(selector, tag, attributes, value, valueAttr) {
    const existing = document.head.querySelector(selector);
    if (value === null) {
      existing?.remove();
      return;
    }
    const el = existing || document.head.appendChild(document.createElement(tag));
    Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val));
    if (valueAttr) el.setAttribute(valueAttr, value);
    else el.textContent = value;
  }

  update('link[rel="canonical"]', "link", { rel: "canonical" }, canonical, "href");
  meta.forEach(([attr, key, content]) => {
    update(`meta[${attr}="${key}"]`, "meta", { [attr]: key }, content, "content");
  });
  update("#page-schema", "script", { id: "page-schema", type: "application/ld+json" },
    structuredData ? JSON.stringify(structuredData) : null);
}
