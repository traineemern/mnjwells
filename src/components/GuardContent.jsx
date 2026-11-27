/* Strict dev-only badge and production dummy-content guard */

export function DevBadge({ tag = "verify", label }) {
  if (!import.meta.env.DEV || tag === "legacy") return null;
  const text = label || tag;
  return <span className={`dev-dummy-tag is-tag-${tag}`}>{text}</span>;
}

/**
 * Guards unconfirmed `dummy` sections so they render clearly badged in development
 * and never ship in a production bundle until confirmed and untagged.
 */
export function GuardContent({ tag = "legacy", children }) {
  if (tag === "dummy" && !import.meta.env.DEV) {
    return null;
  }
  return children;
}
