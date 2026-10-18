import { useEffect } from "react";

const APP_NAME = "Job Notifier";
const BASE_URL = "https://www.thejobnotifier.in";
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

function stripMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/[#*`_~[\]()]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function updateMetaTag(attrName, attrValue, content) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute(rel, rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function useSEO({
  title,
  description,
  keywords,
  canonicalPath = "",
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  jsonLd = null,
} = {}) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title.includes(APP_NAME)
        ? title
        : `${title} | ${APP_NAME}`;
    }

    // 2. Update Meta Description
    if (description) {
      const cleanDesc = stripMarkdown(description).slice(0, 160);
      updateMetaTag("name", "description", cleanDesc);
      updateMetaTag("property", "og:description", cleanDesc);
      updateMetaTag("name", "twitter:description", cleanDesc);
    }

    // 3. Update Meta Keywords
    if (keywords) {
      updateMetaTag("name", "keywords", keywords);
    }

    // 4. Update Meta Robots
    if (noindex) {
      updateMetaTag("name", "robots", "noindex, nofollow");
    } else {
      updateMetaTag(
        "name",
        "robots",
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      );
    }

    // 5. Update Canonical & Open Graph URL
    const cleanPath = canonicalPath.startsWith("/")
      ? canonicalPath
      : `/${canonicalPath}`;
    const fullUrl = `${BASE_URL}${cleanPath === "/" ? "/" : cleanPath}`;
    updateLinkTag("canonical", fullUrl);
    updateMetaTag("property", "og:url", fullUrl);

    // 6. Open Graph & Twitter Social Metadata
    if (title) {
      updateMetaTag("property", "og:title", document.title);
      updateMetaTag("name", "twitter:title", document.title);
    }
    updateMetaTag("property", "og:type", ogType);
    updateMetaTag("property", "og:image", ogImage || DEFAULT_IMAGE);
    updateMetaTag("name", "twitter:image", ogImage || DEFAULT_IMAGE);

    // 7. Dynamic JSON-LD Structured Data
    let scriptEl = document.getElementById("app-dynamic-jsonld");
    if (jsonLdString) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "app-dynamic-jsonld";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = jsonLdString;
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      const el = document.getElementById("app-dynamic-jsonld");
      if (el) el.remove();
    };
  }, [
    title,
    description,
    keywords,
    canonicalPath,
    ogType,
    ogImage,
    noindex,
    jsonLdString,
  ]);
}
