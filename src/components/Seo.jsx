import { useEffect } from "react";
import { site } from "../data/site.js";

const setMeta = (attribute, key, value) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
};

export default function Seo({ title, description, path, ogImage = "/images/truck.webp", breadcrumbLabel, schema }) {
  useEffect(() => {
    const base = site.siteUrl.replace(/\/$/, "");
    const canonicalUrl = `${base}${path}`;
    const fullImageUrl = `${base}${ogImage}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", fullImageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullImageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const graphs = [];
    if (schema) graphs.push(schema);

    if (path !== "/" && breadcrumbLabel) {
      graphs.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: canonicalUrl },
        ],
      });
    }

    let jsonLd = document.getElementById("page-jsonld");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "page-jsonld";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = graphs.length === 1 ? JSON.stringify(graphs[0]) : JSON.stringify(graphs);
  }, [title, description, path, ogImage, breadcrumbLabel, schema]);

  return null;
}
