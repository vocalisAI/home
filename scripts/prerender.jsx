import React from "react";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes, loadInitialRoute } from "../src/App";
import { NOT_FOUND, PAGES, SITE_URL } from "../src/data/pages";
import { pageHead } from "../src/lib/seo";

function renderHead(page) {
  const { title, canonical, meta, structuredData } = pageHead(page);
  return renderToStaticMarkup(
    <>
      <title>{title}</title>
      {canonical && <link rel="canonical" href={canonical} />}
      {meta.map(([attr, name, content]) => content !== null &&
        <meta key={name} {...{ [attr]: name }} content={content} />)}
      {structuredData && <script id="page-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}
    </>,
  );
}

export async function prerender() {
  const dir = path.resolve(process.cwd(), "build");
  const template = await readFile(path.join(dir, "index.html"), "utf8");
  const title = "<title>Vocalis</title>";
  const root = /<div id=(?:"root"|root)><\/div>/;
  if (!template.includes(title) || !root.test(template)) {
    throw new Error("Missing title or React root in the built HTML template.");
  }

  for (const page of [...PAGES, NOT_FOUND]) {
    const pathname = page === NOT_FOUND ? "/404" : page.path;
    const name = pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;
    const initialRoute = await loadInitialRoute(pathname);
    const body = renderToString(
      <StaticRouter location={pathname}><AppRoutes initialRoute={initialRoute} /></StaticRouter>,
    );
    const html = template
      .replace(title, () => renderHead(page))
      .replace(root, () => `<div id="root" data-prerendered="${page.path}">${body}</div>`);
    await writeFile(path.join(dir, name), html);
    console.log(`Pre-rendered ${pathname}`);
  }

  const urls = PAGES.map(({ path: url }) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join("\n");
  await writeFile(path.join(dir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
